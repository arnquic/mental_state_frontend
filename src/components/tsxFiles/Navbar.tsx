import "../cssFiles/Navbar.css";

import React from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppContext, defaultLog } from "../../context/AppContext";
import { useContext } from "react";

const Navbar = (): JSX.Element => {

    const { user, setUser, setNewLog, setLogs } = useContext(AppContext);

    const navigation: NavigateFunction = useNavigate();

    function handleSummitClick(e: React.MouseEvent<HTMLHeadingElement>): void {
        navigation("/");
    }

    function handleLoginClick(e: React.MouseEvent<HTMLButtonElement>): void {
        navigation("/login");
    }

    function handleNewEntryClick(e: React.MouseEvent<HTMLButtonElement>): void {
        navigation("/newEntry");
    }

    function handleDashboardClick(e: React.MouseEvent<HTMLButtonElement>): void {
        navigation("/dashboard/logs");
    }

    function handleLogoutClick(e: React.MouseEvent<HTMLButtonElement>): void {
        setNewLog(defaultLog);
        setLogs([defaultLog]);
        setUser(null);
        localStorage.removeItem("summitAuth");
    }

    function handleAnalysisTestClick(): void {
        navigation("/analysis");
    }

    return (
        <div className="Navbar">
            {user ?
                <>
                    <div className="NavbarSummitHolder">
                        <h4 className="NavbarSummit" onClick={handleSummitClick}>Summit</h4>
                    </div>
                    <div className="NavbarRight">
                        <button onClick={handleAnalysisTestClick}>DEV: Analysis</button>
                        <div className="NavbarWelcomeOptionsHolder">
                            <p>Welcome, {user.firstName}</p>
                            <div className="NavbarOptions">
                                <button onClick={handleNewEntryClick}>New Entry</button>
                                <button onClick={handleDashboardClick}>Dashboard</button>
                            </div>
                        </div>
                        <button className="NavbarLogoutBtn" onClick={handleLogoutClick}>Logout</button>
                    </div>
                </>
                :
                <>
                    <div className="NavbarSummitHolder">
                        <h4 className="NavbarSummit" onClick={handleSummitClick}>Summit</h4>
                    </div>                    <div className="NavbarRight">
                        <button className="NavbarLoginBtn" onClick={handleLoginClick}>Login</button>
                    </div>
                </>
            }
        </div>
    )
}

export default Navbar
