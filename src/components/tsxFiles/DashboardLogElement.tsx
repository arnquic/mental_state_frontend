import "../cssFiles/DashboardLogElement.css";

import React from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from "../../context/AppContext";

interface IProps {
    dateTime: string | null,
    content: string | null,
    analysis: number | null,
    id: number | null
}

const DashboardLogElement = (props: IProps): JSX.Element => {

    const navigation: NavigateFunction = useNavigate();

    const { setAnalysisLog } = useContext(AppContext);

    const localTimeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: localTimeZone
    };

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        timeZone: localTimeZone
    };

    const dateFormat = new Intl.DateTimeFormat("en-US", dateOptions);
    const timeFormat = new Intl.DateTimeFormat("en-US", timeOptions);

    function handleLogElementClick(): void {
        setAnalysisLog({
            content: props.content,
            analysis: props.analysis,
            dateTime: props.dateTime,
            id: props.id
        })
        navigation("/analysis");
    }

    return (
        <div className='DashboardLogElement' onClick={handleLogElementClick}>
            {props.dateTime ?
                <h3 className='DashboardLogElementDate'>{dateFormat.format(Date.parse(props.dateTime))}</h3>
                :
                null
            }
            {props.dateTime ?
                <h3 className='DashboardLogElementTime'>{timeFormat.format(Date.parse(props.dateTime))}</h3>
                :
                null
            }
            {props.content ?
                <p className='DashboardLogElementContent'>{props.content}</p>
                :
                null
            }
            {props.analysis ?
                <div className="DashboardLogElementAnalysisHolder">
                    <div className="DashboardLogElementScoreOuterCircle">
                        <div className='DashboardLogElementScoreInnerCircle'>
                            <h4 className='DashboardLogElementAnalysis'>{props.analysis}</h4>
                        </div>
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}

export default DashboardLogElement
