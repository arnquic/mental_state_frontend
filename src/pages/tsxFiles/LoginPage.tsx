import '../cssFiles/LoginPage.css';

import axios, { AxiosError, AxiosResponse } from 'axios';
import React from 'react';
import env from 'react-dotenv';
import { useState, useContext } from 'react';
import { AppContext, stringEmpty } from '../../context/AppContext';
import { Link } from 'react-router-dom';

interface ILoginInfo {
    email: string,
    password: string
}

const LoginPage = (): JSX.Element => {

    const defaultLoginInfo: ILoginInfo = {
        email: "",
        password: ""
    }

    const [loginInfo, setLoginInfo] = useState<ILoginInfo>(defaultLoginInfo);
    const [err, setErr] = useState<string>("");

    const { setUser } = useContext(AppContext);

    function handleFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setLoginInfo({
            ...loginInfo,
            [name]: value
        })
    }

    async function submitLogin(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        const anyInfoMissing: boolean = (stringEmpty(loginInfo.email) || stringEmpty(loginInfo.password));
        if (anyInfoMissing) {
            setErr("All values must be provided.");
        }
        else {
            try {
                const response: AxiosResponse = await axios.post(`${env.BACKEND_URL}/user/login`, { email: loginInfo.email, password: loginInfo.password });
                setUser(response.data.user_info);
                localStorage.setItem('summitAuth', response.data.summit_auth);
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

    return (
        <div className='LoginPage'>
            <div className='LoginTitle'>
                <h2>Login</h2>
            </div>
            <form className='LoginForm'
                onSubmit={(e) => { submitLogin(e); }}
            >
                <div className='LoginEmail'>
                    <input className="LoginTextInput" name="email" type="email" placeholder="Email" value={loginInfo.email} onChange={handleFormChange} />
                </div>
                <div className='LoginPassword'>
                    <input className="LoginTextInput" name="password" type="password" placeholder="Password" value={loginInfo.password} onChange={handleFormChange} />
                </div>
                <div className='LoginErrMsg'>
                    <p>{err}</p>
                </div>
                <input className="LoginSubmit" type="submit" value="Submit" />
            </form >
            <div className='LoginToSignup'>
                <p>Don't have an account?</p>
                <Link to="/signup">Create one here.</Link>
            </div>
        </div>
    )
}

export default LoginPage;
