import React, { useState, createContext } from "react";

interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    summitAuth: string;
}

type TUser = IUser | null;

interface ILog {
    content: string;
    dateTime: Date;
    analysis: number;
}

type TLog = ILog | null;

interface IContext {
    user: TUser;
    setUser: React.Dispatch<React.SetStateAction<TUser>>;
    logs: TLog[];
    setLogs: React.Dispatch<React.SetStateAction<TLog[]>>;
}

const defaultState: IContext = {
    user: null,
    setUser: () => { },
    logs: [null],
    setLogs: () => { }
}

const AppContext: React.Context<IContext> = createContext<IContext>(defaultState);

interface IChildrenProps {
    children: React.ReactNode;
}

function AppProvider({ children }: IChildrenProps): JSX.Element {

    const [user, setUser] = useState<TUser>(null);
    const [logs, setLogs] = useState<TLog[]>([null]);

    const state: IContext = {
        user: user,
        setUser: setUser,
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