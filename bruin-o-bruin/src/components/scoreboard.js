import React, { useState, useEffect } from 'react'
import Profiles from './scoreboardProfile';
import axios from "axios";
import "./scoreboard.css";

export default function Board() {
    const period = useState(0)[0];
    const [Leaderboard, setBoard] = useState([]);
    async function getBoard() {
        const params = new Headers();
        const response = await axios.get('/scoreboard', params);
        if (response.data[0].valid) {
            setBoard(response.data.slice(1));
        } else {
            alert(response.data[1].message);
        }
    }
    getBoard();

    useEffect(() => {
        const interval = setInterval(() => { getBoard(); }, 10000);//refreshes every 10 second
        return () => clearInterval(interval);
    }, []);

    function importAll(r) {
        return r.keys().map(r);
    }
    const trophyImg = importAll(require.context('../../../images/icon', false, /trophy\.(png|jpe?g|svg)$/))[0];
    const homeIcon = importAll(require.context('../../../images/icon', false, /home-icon\.(png|jpe?g|svg)$/))[0];

    return (
        <div className="cnmboard">
            <div className="cnmboard__header">
                <h1 className='leaderboard'>Leaderboard</h1>
            </div>
            <div className="rankings">
                <Profiles Leaderboard={rank(Leaderboard)}></Profiles>
            </div>
            <img className="ranking-image ranking-image-left" src={trophyImg} alt="" />
            <img className="ranking-image ranking-image-right" src={trophyImg} alt="" />
            <div className='ranking-background'></div>
            <div className='ranking-home'>
                <button className="ranking-home-button">
                    <img className="ranking-home-img" src={homeIcon} alt="home icon" onClick={() => window.location.href = "/home"} />
                </button>
            </div>
        </div>
    )
}

// To make leaders arrange in order of score
function rank(data) {
    // sort in dscending order
    return data.sort((a, b) => {
        if (a.score > b.score) {
            return -1;
        }
        else if (a.score < b.score) {
            return 1;
        }
        else {
            if (a.time < b.time) {
                return -1;
            }
            else {
                return 1;
            }
        }
    })

}