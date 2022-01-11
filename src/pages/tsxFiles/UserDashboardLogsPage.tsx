import DashboardLogElement from '../../components/tsxFiles/DashboardLogElement';

import React from 'react';
import env from 'react-dotenv';
import axios, { AxiosResponse } from 'axios';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { JsxAttributeLike } from 'typescript';

const UserDashboardLogsPage = () => {

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
                    logs ?
                        logs.map<JSX.Element>((log) => {
                            return (
                                <DashboardLogElement dateTime={log?.dateTime} />
                            )
                        })
                        :
                        null
                }
            </>
        )
    }

    return (
        <>
            {
                logs ?
                    <div>
                        <DashboardLogElement dateTime={logs[0]?.dateTime}
                    </div >
                    :
                    <h2>Loading...</h2>
            }
        </>
    )
}

export default UserDashboardLogsPage
