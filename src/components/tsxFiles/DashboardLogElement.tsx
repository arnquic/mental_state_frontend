import React from 'react'

interface IProps {
    dateTime: Date | null,
    content: string | null,
    analysis: number | null
}

const DashboardLogElement = (props: IProps): JSX.Element => {

    const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

    return (
        <div>
            {props.dateTime ?
                <h3>{dateTimeFormat.format(props.dateTime)}</h3>
                :
                null
            }

        </div>
    )
}

export default DashboardLogElement
