import "../cssFiles/AnalysisPage.css";
import React from 'react'

import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

const AnalysisPage = (): JSX.Element => {

    const { analysisLog } = useContext(AppContext);

    return (
        <div className="AnalysisPage">
            {
                analysisLog ?
                    <div className="AnalysisPageCenter">
                        <div className="AnalysisPageLogContent">
                            <h2 className="AnalysisPageLogContentHeader">You logged:</h2>
                            <p>{analysisLog.content}</p>
                        </div>
                        <div className='AnalysisPageResult'>
                            <h2 className="AnalysisPageResultHeader">Our Analysis:</h2>
                            <div className="AnalysisPageScoreExplanationHolder">
                                <div className="AnalysisPageScoreHolder">
                                    <div className="AnalysisPageScoreOuterCircle">
                                        <div className="AnalysisPageScoreInnerCircle">
                                            <h1>{analysisLog.analysis}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="AnalysisPageExplanation">
                                    <h2>But, what does that mean?</h2>
                                    <p>A higher score reflects a higher likelihood of a depressed and/or anxious state.</p>
                                    <p>We currently do our analysis based off of today's leading science on linguistic analysis for indication or mental state based on indicators for depression and anxiety. We're looking to expand to other non-neuro-typical mental health states.</p>
                                    <p>
                                        For more information on the science we're currently using, checkout <span>
                                            <a href='https://journals.sagepub.com/doi/full/10.1177/2167702617747074' rel="noreferrer" target="_blank">
                                                this journal article.
                                            </a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <h1>Loading...</h1>
            }
        </div>
    )
}

export default AnalysisPage
