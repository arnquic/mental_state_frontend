import "../cssFiles/HomePage.css"

import Summit_Logo from "../../media/Summit_NewLog.png";
import Summit_Dashboard from "../../media/Summit_Dashboard.png";
import Summit_Analysis from "../../media/Summit_Analysis.png";
import HomeElement from '../../components/tsxFiles/HomeElement';

import React from 'react';

const HomePage = (): JSX.Element => {
    return (
        <div className="HomePage">
            <div className="HomePageIntro">
                <h1>Welcome to Summit!</h1>
                <p>While no one ever reaches a "summit" in life and stays there, we're here to help you understand your journey through life's ups and downs, knowing that another summit is entirely reachable.</p>
            </div>
            <HomeElement imgLeft={true} img={Summit_Logo} imgAlt='New Log' heading='Log Your Thoughts' text="Do it as often as you like, though logging at least daily increases the understanding you'll get when looking back on your logs." />
            <HomeElement imgLeft={false} img={Summit_Analysis} imgAlt='Log Analysis' heading='Linguistic Analysis of Your Logs' text='There to help give you an idea of whether your thinking might be that of a depressed or anxious state.' />
            <HomeElement imgLeft={true} img={Summit_Dashboard} imgAlt='User Dashboard' heading='Look Back at All of Your Logs' text='All of your logs are saved, so you can look back and see when you may have been feeling down, and why.' />
        </div>
    )
}

export default HomePage
