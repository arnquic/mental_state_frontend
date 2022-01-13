import '../cssFiles/SignupPage.css';

import React from 'react';
import { Link } from 'react-router-dom';
import env from 'react-dotenv';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AppContext, stringEmpty } from '../../context/AppContext';

interface ISignupInfo {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignupPage = (): JSX.Element => {

    const defaultSignupInfo: ISignupInfo = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    const [signupInfo, setSignupInfo] = useState<ISignupInfo>(defaultSignupInfo);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");

    const { setUser } = useContext(AppContext);

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setSignupInfo({
            ...signupInfo,
            [name]: value
        })
    }

    async function submitSignup(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (signupInfo.confirmPassword === signupInfo.password) {
            const anyInfoMissing: boolean = (stringEmpty(signupInfo.firstName) || stringEmpty(signupInfo.lastName) || stringEmpty(signupInfo.email) || stringEmpty(signupInfo.password))
            if (anyInfoMissing) {
                setErr("All values must be provided.")
            }
            else {
                try {
                    const response: AxiosResponse = await axios.post(`${env.BACKEND_URL}/user`, { first_name: signupInfo.firstName, last_name: signupInfo.lastName, email: signupInfo.email, password: signupInfo.password });
                    if (response.data.user_info) {
                        setUser(response.data.user_info);
                        localStorage.setItem('summitAuth', response.data.summit_auth);
                    }
                    else {
                        setErr(response.data.message);
                    }
                }
                catch (err: Error | AxiosError | unknown) {
                    if (axios.isAxiosError(err)) {
                        const response: AxiosResponse | undefined = err.response;
                        if (response) {
                            console.log(response.data.message);
                            setErr(response.data.message);
                        }
                        else {
                            setErr(err.message);
                        }
                    }
                    else {
                        setErr("Unknown Error.");
                    }
                }
            }
        }
    }


    function checkPasswordMatch(): void {
        if (signupInfo.password === signupInfo.confirmPassword) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
    }

    useEffect(checkPasswordMatch, [signupInfo]);

    return (
        <div className='SignupPage'>
            <div className='SignupPageCenter'>
                <div className='SignupTitle'>
                    <h2>Create New Account</h2>
                </div>
                <form className='SignupForm'
                    onSubmit={(e) => { submitSignup(e); }}
                >
                    <div className='SignupFirstName'>
                        <input className="SignupTextInput" name="firstName" type="text" placeholder="First Name" value={signupInfo.firstName} onChange={handleFormChange} />
                    </div>
                    <div className='SignupLastName'>
                        <input className="SignupTextInput" name="lastName" type="text" placeholder="Last Name" value={signupInfo.lastName} onChange={handleFormChange} />
                    </div>
                    <div className='SignupEmail'>
                        <input className="SignupTextInput" name="email" type="email" placeholder="Email" value={signupInfo.email} onChange={handleFormChange} />
                    </div>
                    <div className='SignupPassword'>
                        <input className="SignupTextInput" name="password" type="password" placeholder="Password" value={signupInfo.password} onChange={handleFormChange} />
                        <span className='SignupPasswordMatch'>{passwordMatch ? "" : " Passwords must match."}</span>
                    </div>
                    <div className='SignupConfirmPassword'>
                        <input className="SignupTextInput" name="confirmPassword" type="password" placeholder="Confirm Password" value={signupInfo.confirmPassword} onChange={handleFormChange} />
                        <span className='SignupPasswordMatch'>{passwordMatch ? "" : " Passwords must match."}</span>
                    </div>
                    <div className='SignupErrMsg'>
                        <p>{err}</p>
                    </div>
                    <input className="SignupSubmit" type="submit" value="Submit" />
                </form >
                <div className='SignupToLogin'>
                    <p>Already have an account?</p>
                    <Link to="/login">Login here.</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage;
