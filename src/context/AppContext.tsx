import React, { useState, createContext } from "react";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    summitAuth: string;
}

export type TUser = IUser | null;

interface ILog {
    content: string;
    dateTime: Date;
    analysis: number;
}

export type TLog = ILog | null;

interface IContext {
    user: TUser;
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
    log: TLog;
    setLog: React.Dispatch<React.SetStateAction<TLog>>
    logs: TLog[];
    setLogs: React.Dispatch<React.SetStateAction<TLog[]>>;
}

const defaultState: IContext = {
    user: null,
    setUser: () => { },
    log: null,
    setLog: () => { },
    logs: [null],
    setLogs: () => { }
}

const AppContext: React.Context<IContext> = createContext<IContext>(defaultState);

interface IChildrenProps {
    children: React.ReactNode;
}

function AppProvider({ children }: IChildrenProps): JSX.Element {

    const [user, setUser] = useState<TUser>(null);
    const [log, setLog] = useState<TLog>(null);
    const [logs, setLogs] = useState<TLog[]>([null]);

    const state: IContext = {
        user: user,
        setUser: setUser,
        log: log,
        setLog: setLog,
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