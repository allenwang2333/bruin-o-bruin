import React from 'react'
import "./scoreboard.css";

export default function profiles({ Leaderboard }) {
    return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
    )
}

//  TODO: Need to add score item
function Item(data) {
    return (
        <>
            {
                data.map((value, index) => (
                    <div className="rank_item" key={index}>
                        <div className="rank_item__rank">{index + 1}</div>
                        <div className="rank_item__item">
                            <span className='name text-dark'><b>{truncateName(value.username)} </b>
                                score: {value.score} time: {value.timeString}</span>
                        </div>
                    </div>
                )
                )
            }
        </>


    )
}

function truncateName (name) {
    if (name.length > 10){
        return name.substring(0, 7) + "...";
    }
    return name
}