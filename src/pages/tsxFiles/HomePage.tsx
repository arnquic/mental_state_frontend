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
            <HomeElement imgLeft={true} img={Summit_Logo} imgAlt='New Log' heading='Test 1' text='Some test paragraph text content.' />
            <HomeElement imgLeft={false} img={Summit_Dashboard} imgAlt='User Dashboard' heading='Test 2' text='Some test paragraph text content.' />
            <HomeElement imgLeft={true} img={Summit_Analysis} imgAlt='Log Analysis' heading='Test 3' text='Some test paragraph text content.' />
        </div>
    )
}

export default HomePage
