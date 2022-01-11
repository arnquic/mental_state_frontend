import "../cssFiles/DashboardLogElement.css";
import React from 'react'

interface IProps {
    dateTime: string | null,
    content: string | null,
    analysis: number | null
}

const DashboardLogElement = (props: IProps): JSX.Element => {

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
    }

    const dateFormat = new Intl.DateTimeFormat("en-US", dateOptions);
    const timeFormat = new Intl.DateTimeFormat("en-US", timeOptions);

    return (
        <div className='DashboardLogElement'>
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
                    <div className='DashboardLogElementScoreCircle'>
                        <h4 className='DashboardLogElementAnalysis'>{props.analysis}</h4>
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}

export default DashboardLogElement
