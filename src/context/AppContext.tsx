import React, { useState, createContext } from "react";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    summitAuth: string;
}

export type TUser = IUser | null;

export interface ILog {
    id: number | null;
    content: string | null;
    dateTime: string | null;
    analysis: number | null;
}

interface IContext {
    user: TUser;
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
    newLog: ILog;
    setNewLog: React.Dispatch<React.SetStateAction<ILog>>
    logs: ILog[];
    setLogs: React.Dispatch<React.SetStateAction<ILog[]>>;
}

export const defaultLog: ILog = {
    id: null,
    content: null,
    dateTime: null,
    analysis: null
}
const defaultState: IContext = {
    user: null,
    setUser: () => { },
    newLog: defaultLog,
    setNewLog: () => { },
    logs: [defaultLog],
    setLogs: () => { }
}

const AppContext: React.Context<IContext> = createContext<IContext>(defaultState);

interface IChildrenProps {
    children: React.ReactNode;
}

function AppProvider({ children }: IChildrenProps): JSX.Element {

    const [user, setUser] = useState<TUser>(null);
    const [newLog, setNewLog] = useState<ILog>(defaultLog);
    const [logs, setLogs] = useState<ILog[]>([defaultLog]);

    const state: IContext = {
        user: user,
        setUser: setUser,
        newLog: newLog,
        setNewLog: setNewLog,
        logs: logs,
        setLogs: setLogs
    }

    return (
        <AppContext.Provider value={state}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppProvider };