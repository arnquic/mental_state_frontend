import "../cssFiles/UserDashboardAccountPage.css";
import UserDashboardSelections from '../../components/tsxFiles/UserDashboardSelections'

import React from 'react';
import env from "react-dotenv";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useState, useEffect, useContext } from "react";
import { AppContext, defaultLog } from "../../context/AppContext";
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

interface IDeleteAccountInfo {
    password: string,
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

const defaultDeleteAccountInfo: IDeleteAccountInfo = {
    password: "",
    confirmPassword: ""
}

const UserDashboardAccountPage = () => {

    const { user, setUser, setAnalysisLog, setLogs } = useContext(AppContext);

    const [emailInfo, setEmailInfo] = useState<IEmailInfo>(defaultEmailInfo);
    const [passwordInfo, setPasswordInfo] = useState<IPasswordInfo>(defaultPasswordInfo);
    const [deleteAccountInfo, setDeleteAccountInfo] = useState<IDeleteAccountInfo>(defaultDeleteAccountInfo);
    const [changePasswordMatch, setChangePasswordMatch] = useState<boolean>(false);
    const [deleteAccountMatch, setDeleteAccountMatch] = useState<boolean>(false);
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
    const [passwordUpdateErr, setPasswordUpdateErr] = useState<string>("");
    const [deleteErr, setDeleteErr] = useState<string>("");

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

    function handleDeleteAccountFormChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;
        setDeleteAccountInfo({
            ...deleteAccountInfo,
            [name]: value
        })
    }

    function checkChangePasswordPasswordsMatch(): void {
        if (passwordInfo.newPassword === passwordInfo.confirmPassword) {
            setChangePasswordMatch(true);
        }
        else {
            setChangePasswordMatch(false);
        }
    }

    useEffect(checkChangePasswordPasswordsMatch, [passwordInfo]);

    function checkDeleteAccountPasswordsMatch(): void {
        if (deleteAccountInfo.password === deleteAccountInfo.confirmPassword) {
            setDeleteAccountMatch(true);
        }
        else {
            setDeleteAccountMatch(false);
        }
    }

    useEffect(checkDeleteAccountPasswordsMatch, [deleteAccountInfo]);

    const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
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
        const summitAuth = localStorage.getItem("summitAuth");
        if (changePasswordMatch && summitAuth) {
            const response: AxiosResponse = await axios.put(`${env.BACKEND_URL}/user/update`, { current_password: passwordInfo.currentPassword, new_password: passwordInfo.newPassword }, { headers: { authorization: summitAuth } });
            console.log(response);
            localStorage.setItem("summitAuth", response.data.summit_auth);
            setUser(response.data.user_info);
        }
    }

    function handleDeleteClick(): void {
        setConfirmDelete(true);
    }

    function handleCancelDeleteClick(): void {
        setConfirmDelete(false);
    }

    async function handleConfirmDeleteClick(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
        e.preventDefault();
        if (deleteAccountMatch && deleteAccountInfo.password.length > 0) {
            const summitAuth: string | null = localStorage.getItem("summitAuth");
            if (summitAuth) {
                try {
                    const response: AxiosResponse = await axios.delete(`${env.BACKEND_URL}/user/delete`, { headers: { authorization: summitAuth }, data: { password: deleteAccountInfo.password } });
                    if (response.data.code === 0) {
                        localStorage.removeItem("summitAuth");
                        setAnalysisLog(defaultLog);
                        setLogs([defaultLog]);
                        setUser(null);
                    }
                    else {
                        setDeleteErr(response.data.message);
                    }
                }
                catch (err: Error | AxiosError | unknown) {
                    if (axios.isAxiosError(err)) {
                        const response: AxiosResponse | undefined = err.response;
                        if (response) {
                            setDeleteErr(response.data.message);
                        }
                        else {
                            setDeleteErr(err.message);
                        }
                    }
                    else {
                        setDeleteErr("Unknown Error.");
                    }
                }
            }
        }
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
                                <span className='UpdatePasswordMatch'>{changePasswordMatch ? "" : " Passwords must match."}</span>
                            </div>
                            <div>
                                <input className="UserDashboardAccountPageTextInput" name="confirmPassword" type="password" placeholder="Confirm new password" value={passwordInfo.confirmPassword} onChange={handlePasswordFormChange} />
                                <span className='UpdatePasswordMatch'>{changePasswordMatch ? "" : " Passwords must match."}</span>
                            </div>
                            <input className="UserDashboardAccountPageSubmitBtn" type="submit" placeholder="Submit" />
                        </form>
                        <h3 className="UserDashboardAccountPageSubHeader">Delete Account</h3>
                        <div className="DeleteAccount">
                            {confirmDelete
                                ?
                                <>
                                    <button className="CancelDeleteAccountButton" onClick={handleCancelDeleteClick}>Cancel</button>
                                    <div>
                                        <input className="UserDashboardAccountPageTextInput" name="password" type="password" placeholder="Enter your password" value={deleteAccountInfo.password} onChange={handleDeleteAccountFormChange} />
                                        <span className='UpdatePasswordMatch'>{deleteAccountMatch ? "" : " Passwords must match."}</span>
                                    </div>
                                    <div>
                                        <input className="UserDashboardAccountPageTextInput" name="confirmPassword" type="password" placeholder="Confirm your password" value={deleteAccountInfo.confirmPassword} onChange={handleDeleteAccountFormChange} />
                                        <span className='UpdatePasswordMatch'>{deleteAccountMatch ? "" : " Passwords must match."}</span>
                                    </div>
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
