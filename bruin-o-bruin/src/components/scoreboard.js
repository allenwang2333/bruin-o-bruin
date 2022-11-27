import React, { useState, useEffect } from 'react'
import Profiles from './scoreboardProfile';
import axios from "axios";
import "./scoreboard.css";

export default function Board() {
    const [period, setPeriod] = useState(0);
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

    const handleClick = (e) => {
        setPeriod(e.target.dataset.id)
    }

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
                <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
            </div>
            <img className="ranking-image ranking-image-left" src={trophyImg} alt="A trophy image" />
            <img className="ranking-image ranking-image-right" src={trophyImg} alt="A trophy image" />
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
function between(data, between) {
    const today = new Date(); // today's date
    const previous = new Date(today);
    previous.setDate(previous.getDate() - (between + 1)); // How many previous date to consider for leaderboard

    let filter = data.filter(val => {

        let userDate = new Date(val.post_time);
        if (between === 0) return val;
        return previous <= userDate && today >= userDate;
    })

    // sort in ascending order
    return filter.sort((a, b) => {
        if (a.score === b.score) {
            if (a.time === b.time) {
                return b.score - a.score;
            } else {
                return a.time - b.time;
            }
        } else {
            return b.score - a.score;
        }
    })

}