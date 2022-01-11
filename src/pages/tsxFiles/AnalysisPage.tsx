import React from 'react'

import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

const AnalysisPage = (): JSX.Element => {

    const { newLog } = useContext(AppContext);

    return (
        <>
            {
                newLog ?
                    <div>
                        <h2>You logged:</h2>
                        <p>{newLog.content}</p>
                        <div className='AnalysisPageResult'>
                            <h2>Our Analysis:</h2>
                            <div className="AnalysisPageScoreCircle">
                                <h1>{newLog.analysis}</h1>
                            </div>
                            <h2>But, what does that mean?</h2>
                            <p>We currently do our analysis based off of today's leading science on linguistic analysis for indication or mental state based on indicators for depression and anxiety. We're looking to expand to other non-neuro-normative mental health states.
                            </p>
                            <p>
                                For more information on the science we're currently using, checkout <span>
                                    <a href='https://journals.sagepub.com/doi/full/10.1177/2167702617747074' rel="noreferrer" target="_blank">
                                        this journal article.
                                    </a>
                                </span>
                            </p>
                        </div>
                    </div>
                    :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default AnalysisPage
