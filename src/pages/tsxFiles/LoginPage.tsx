import '../cssFiles/LoginPage.css';

import axios, { AxiosResponse } from 'axios';
import React from 'react';
import env from 'react-dotenv';
import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
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
        const response: AxiosResponse = await axios.post(`${env.BACKEND_URL}/user/login`, { email: loginInfo.email, password: loginInfo.password });
        setUser(response.data.user_info);
        localStorage.setItem('summitAuth', response.data.summit_auth);
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
                    <input name="email" type="email" placeholder="Email" value={loginInfo.email} onChange={handleFormChange} />
                </div>
                <div className='LoginPassword'>
                    <input name="password" type="password" placeholder="Password" value={loginInfo.password} onChange={handleFormChange} />
                </div>
                <input type="submit" value="Submit" />
            </form >
            <div className='LoginToSignup'>
                <p>Don't have an account?</p>
                <Link to="/signup">Create one here.</Link>
            </div>
        </div>
    )
}

export default LoginPage;
