import "../cssFiles/UserDashboardSelections.css";

import React from 'react'
import { Link } from "react-router-dom";

const UserDashboardSelections = (): JSX.Element => {
    return (
        <div className="UserDashboardSelections">
            <Link className="UserDashboardSelectionsOption" to="/dashboard/logs">Log History</Link>
            <Link className="UserDashboardSelectionsOption" to="/dashboard/account">Account Info</Link>
        </div>
    )
}

export default UserDashboardSelections;
