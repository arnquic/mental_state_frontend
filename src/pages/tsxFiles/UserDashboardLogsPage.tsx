import "../cssFiles/UserDashboardLogsPage.css";
import DashboardLogElement from '../../components/tsxFiles/DashboardLogElement';
import UserDashboardSelections from "../../components/tsxFiles/UserDashboardSelections";

import React from 'react';
import env from 'react-dotenv';
import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { Link } from "react-router-dom";

const UserDashboardLogsPage = (): JSX.Element => {

    const { logs, setLogs } = useContext(AppContext);

    async function getLogs(): Promise<void> {
        const summitAuth = localStorage.getItem("summitAuth");
        if (summitAuth) {
            const response: AxiosResponse = await axios.get(`${env.BACKEND_URL}/logs`, { headers: { authorization: summitAuth } });
            console.log(response);
            setLogs(response.data.logs);
        }
    }

    useEffect((): void => { getLogs(); }, []);

    function createLogElements(): JSX.Element {
        return (
            <>
                {
                    logs[0]
                        ?
                        logs.map<JSX.Element>((log) => {
                            return (
                                <DashboardLogElement key={log.id} id={log.id} dateTime={log.dateTime} content={log.content} analysis={log.analysis} />
                            )
                        })
                        :
                        <>
                            <p>You don't have any Logs yet.
                                <span>
                                    {" "}
                                    <Link to="/newEntry">Make your first one here!</Link>
                                </span>
                            </p>
                        </>
                }
            </>
        )
    }

    return (
        <div className="UserDashboardLogsPage">
            <UserDashboardSelections />
            <div className="UserDashboardLogsPageLogElements">
                <h2>Your Logs</h2>
                {
                    createLogElements()
                }
            </div>
        </div>
    )
}

export default UserDashboardLogsPage
