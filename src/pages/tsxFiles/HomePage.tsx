import "../cssFiles/HomePage.css"
import HomeElement from '../../components/tsxFiles/HomeElement';

import React from 'react';

const HomePage = (): JSX.Element => {
    return (
        <div className="HomePage">
            <HomeElement imgLeft={true} imgSrc='None' imgAlt='None' heading='Test 1' text='Some test paragraph text content.' />
            <HomeElement imgLeft={false} imgSrc='None' imgAlt='None' heading='Test 2' text='Some test paragraph text content.' />
            <HomeElement imgLeft={true} imgSrc='None' imgAlt='None' heading='Test 3' text='Some test paragraph text content.' />
        </div>
    )
}

export default HomePage
