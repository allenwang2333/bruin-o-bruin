import React, { useState, useEffect} from 'react'
import Profiles from './scoreboardProfile';
import axios from "axios";

export default function Board() {
    const [period, setPeriod] = useState(0);
    const [Leaderboard, setBoard] = useState([]);
    async function getBoard() {
        const params = new Headers();
        const response = await axios.get('/scoreboard', params);
        console.log(response.data);
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

    return (
        <div className="board">
            <h1 className='leaderboard'>Leaderboard</h1>
            <Profiles Leaderboard={between(Leaderboard, period)}></Profiles>
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
            return b.score - a.score;
        } else {
            return b.score - a.score;
        }
    })

}