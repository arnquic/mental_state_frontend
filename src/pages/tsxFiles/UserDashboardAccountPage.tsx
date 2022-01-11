import "../cssFiles/UserDashboardAccountPage.css";
import UserDashboardSelections from '../../components/tsxFiles/UserDashboardSelections'

import React from 'react';
import env from "react-dotenv";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppContext";
import App from "../../App";

interface IEmailInfo {
    newEmail: string,
    password: string
}

interface IPasswordInfo {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

const defaultEmailInfo: IEmailInfo = {
    newEmail: "",
    password: ""
}

const defaultPasswordInfo: IPasswordInfo = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
}

const UserDashboardAccountPage = () => {

    const { user, setUser } = useContext(AppContext);

    const [emailInfo, setEmailInfo] = useState<IEmailInfo>(defaultEmailInfo);
    const [passwordInfo, setPasswordInfo] = useState<IPasswordInfo>(defaultPasswordInfo);
    const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

    function handleEmailFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setEmailInfo({
            ...emailInfo,
            [name]: value
        })
    }

    function handlePasswordFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setPasswordInfo({
            ...passwordInfo,
            [name]: value
        })
    }

    function checkPasswordsMatch(): void {
        if (passwordInfo.newPassword === passwordInfo.confirmPassword) {
            setPasswordMatch(true);
        }
        else {
            setPasswordMatch(false);
        }
    }

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log("emailSubmitTriggered");
        const summitAuth = localStorage.getItem("summitAuth");
        if (summitAuth) {
            const response: AxiosResponse = await axios.put(`${env.BACKEND_URL}/user/update`, { current_password: emailInfo.password, email: emailInfo.newEmail }, { headers: { authorization: summitAuth } });
            console.log(response);
            localStorage.setItem("summitAuth", response.data.summit_auth);
            setUser(response.data.user_info);
        }
    }

    const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        console.log("passwordSubmitTriggered");
        const summitAuth = localStorage.getItem("summitAuth");
        if (passwordMatch && summitAuth) {
            console.log("password update sent to db.");
            const response: AxiosResponse = await axios.put(`${env.BACKEND_URL}/user/update`, { current_password: passwordInfo.currentPassword, new_password: passwordInfo.newPassword }, { headers: { authorization: summitAuth } });
            console.log(response);
            localStorage.setItem("summitAuth", response.data.summit_auth);
            setUser(response.data.user_info);
        }
    }

    useEffect(checkPasswordsMatch, [passwordInfo]);

    function handleDeleteClick(): void {
        setConfirmDelete(true);
    }

    function handleCancelDeleteClick(): void {
        setConfirmDelete(false);
    }

    async function handleConfirmDeleteClick(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault();
    }

    return (
        <div className="UserDashboardAccountPage">
            <UserDashboardSelections />
            <div className="UserDashboardAccountPageInfoHolder">
                <h2>Account Info</h2>
                {user
                    ?
                    <>
                        <div>
                            <div className="UserDashboardAccountPageBasicInfo">
                                <h4>First Name:</h4>
                                <p>{user.firstName}</p>
                            </div>
                            <div className="UserDashboardAccountPageBasicInfo">
                                <h4>Last Name:</h4>
                                <p>{user.lastName}</p>
                            </div>
                            <div className="UserDashboardAccountPageBasicInfo">
                                <h4>Email:</h4>
                                <p>{user.email}</p>
                            </div>
                        </div>
                        <h3 className="UserDashboardAccountPageSubHeader">Change Email</h3>
                        <form className="ChangeEmailForm" onSubmit={(e: React.FormEvent<HTMLFormElement>): void => { handleEmailSubmit(e); }}>
                            <div>
                                <input className="UserDashboardAccountPageTextInput" name="newEmail" type="email" placeholder="Enter new email" value={emailInfo.newEmail} onChange={handleEmailFormChange} />
                            </div>
                            <div>
                                <input className="UserDashboardAccountPageTextInput" name="password" type="password" placeholder="Enter your password" value={emailInfo.password} onChange={handleEmailFormChange} />
                            </div>
                            <input className="UserDashboardAccountPageSubmitBtn" type="submit" placeholder="Submit" />
                        </form>
                        <h3 className="UserDashboardAccountPageSubHeader">Change Password</h3>
                        <form className="ChangePasswordForm" onSubmit={(e: React.FormEvent<HTMLFormElement>): void => { handlePasswordSubmit(e); }}>
                            <div>
                                <input className="UserDashboardAccountPageTextInput" name="currentPassword" type="password" placeholder="Enter your current password" value={passwordInfo.currentPassword} onChange={handlePasswordFormChange} />
                            </div>
                            <div>
                                <input className="UserDashboardAccountPageTextInput" name="newPassword" type="password" placeholder="Enter a new password" value={passwordInfo.newPassword} onChange={handlePasswordFormChange} />
                                <span className='UpdatePasswordMatch'>{passwordMatch ? "" : "Passwords must match."}</span>
                            </div>
                            <div>
                                <input className="UserDashboardAccountPageTextInput" name="confirmPassword" type="password" placeholder="Confirm new password" value={passwordInfo.confirmPassword} onChange={handlePasswordFormChange} />
                                <span className='UpdatePasswordMatch'>{passwordMatch ? "" : "Passwords must match."}</span>
                            </div>
                            <input className="UserDashboardAccountPageSubmitBtn" type="submit" placeholder="Submit" />
                        </form>
                        <h3 className="UserDashboardAccountPageSubHeader">Delete Account</h3>
                        <div className="DeleteAccount">
                            {confirmDelete
                                ?
                                <>
                                    <button className="CancelDeleteAccountButton" onClick={handleCancelDeleteClick}>Cancel</button>
                                    <button className="DeleteAccountButton" onClick={(e): void => { handleConfirmDeleteClick(e) }}>Confirm - There's no going back.</button>
                                </>
                                :
                                <button className="DeleteAccountButton" onClick={handleDeleteClick}>Delete Account</button>
                            }
                        </div>
                    </>
                    :
                    null
                }
            </div>
        </div>
    )
}

export default UserDashboardAccountPage;
