import "../cssFiles/Navbar.css";

import React from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

const Navbar = (): JSX.Element => {

    const { user, setUser } = useContext(AppContext);

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
        navigation("/dashboard");
    }

    function handleLogoutClick(e: React.MouseEvent<HTMLButtonElement>): void {
        setUser(null);
        localStorage.removeItem("userId");
    }

    return (
        <div className="Navbar">
            {user?.summitAuth ?
                <>
                    <h4 onClick={handleSummitClick}>Summit</h4>
                    <div className="NavbarRight">
                        <button onClick={handleNewEntryClick}>New Entry</button>
                        <button onClick={handleDashboardClick}>Dashboard</button>
                        <div className="NavbarUserLogout">
                            <p>Welcome, {user.firstName}</p>
                            <button className="NavbarLogoutBtn" onClick={handleLogoutClick}>Logout</button>
                        </div>
                    </div>
                </>
                :
                <>
                    <h4 onClick={handleSummitClick}>Summit</h4>
                    <button className="NavbarLoginBtn" onClick={handleLoginClick}>Login</button>
                </>
            }
        </div>
    )
}

export default Navbar
