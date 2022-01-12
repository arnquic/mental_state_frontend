import "../cssFiles/NewEntryPage.css";

import React from 'react'
import env from "react-dotenv";
import axios, { AxiosResponse } from "axios";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AppContext } from "../../context/AppContext";

const NewEntryPage = (): JSX.Element => {

    const ABSOLUTIST_WORDS: Array<string> = [
        "absolutely",
        "completely",
        "constantly",
        "definitely",
        "everything",
        "complete",
        "constant",
        "everyone",
        "nothing",
        "totally",
        "always",
        "entire",
        "every",
        "never",
        "whole",
        "ever",
        "full",
        "must",
        "all"
    ];

    const [content, setContent] = useState<string>("")

    const { setAnalysisLog } = useContext(AppContext);

    const navigation: NavigateFunction = useNavigate();

    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>): void {
        setContent(e.target.value);
    }

    async function handleSubmitClick(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (content.length > 0) {
            const analysis: number = analyzeContent();
            const summitAuth: string | null = localStorage.getItem('summitAuth');
            if (summitAuth) {
                const response: AxiosResponse = await axios.post(`${env.BACKEND_URL}/logs`, { content: content, analysis: analysis }, { headers: { authorization: summitAuth } });
                setAnalysisLog({ id: response.data.new_log.id, analysis: response.data.new_log.analysis, content: response.data.new_log.content, dateTime: response.data.new_log.dateTime });
                navigation("/analysis");
            }
        }
    }

    function analyzeContent(): number {
        let numAbsolutistWords: number = 0;
        let totalWords: number = 0;
        const contentNoNewLines: string[] = content.split("\n")
        console.log("content split at new lines: ", contentNoNewLines);
        for (let i: number = 0; i < contentNoNewLines.length; i++) {
            let arrSpacesRemoved: Array<string> = contentNoNewLines[i].split(" ");
            totalWords += arrSpacesRemoved.length;
            for (let j: number = 0; j < arrSpacesRemoved.length; j++) {
                for (let k: number = 0; k < ABSOLUTIST_WORDS.length; k++) {
                    if (arrSpacesRemoved[j].toLowerCase().includes(ABSOLUTIST_WORDS[k].toLowerCase())) {
                        numAbsolutistWords++;
                        console.log(ABSOLUTIST_WORDS[k])
                        break;
                    }
                }
            }
        }
        const analysis: number = Math.round(numAbsolutistWords / totalWords * 10000) / 100;
        console.log("absolutist words: " + numAbsolutistWords);
        console.log("total words: " + totalWords);
        console.log(analysis);
        return analysis;
    }

    return (
        <div className="NewEntryPage">
            <div className="NewEntryPageCenter">
                <div className="NewEntryPageInstructions">
                    <h2>Create a New Log Entry</h2>
                    <p>Don't feel pressured to make it long or short. Write whatever you feel.</p>
                </div>
                <div className="NewEntryPageForm">
                    <div className="NewEntryPageContent">
                        <textarea name="content" placeholder="Enter text here" value={content} onChange={handleTextChange} spellCheck={true} />
                    </div>
                    <div className='NewEntryPageSubmit'>
                        <button onClick={handleSubmitClick}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewEntryPage
