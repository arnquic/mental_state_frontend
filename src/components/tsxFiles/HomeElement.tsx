import "../cssFiles/HomeElement.css";
import React from 'react';

interface Props {
    imgLeft: boolean,
    img: string,
    imgAlt: string,
    heading: string,
    text: string
}

const HomeElement = (props: Props): JSX.Element => {

    return (
        <div className="HomeElement">
            {props.imgLeft
                ?
                <>
                    <img className="HomeElementImg" src={props.img} alt={props.imgAlt} />
                    <div className="HomeElementText">
                        <h3>{props.heading}</h3>
                        <p>{props.text}</p>
                    </div>
                </>
                :
                <>
                    <div className="HomeElementText">
                        <h3>{props.heading}</h3>
                        <p>{props.text}</p>
                    </div>
                    <img className="HomeElementImg" src={props.img} alt={props.imgAlt} />
                </>
            }
        </div>
    )
}

export default HomeElement;
