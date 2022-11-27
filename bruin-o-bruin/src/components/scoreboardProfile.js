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
                            <span className='name text-dark'><b>{value.username} </b>
                                score: {value.score} time: {value.time}</span>
                        </div>
                    </div>
                )
                )
            }
        </>


    )
}