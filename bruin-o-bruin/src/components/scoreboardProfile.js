import React from 'react'

export default function profiles({ Leaderboard }) {
    return (
        <div id="profile">
            {Item(Leaderboard)}
        </div>
    )
}
//  TODO: Need to add score item
function Item(data){
    return (
        <>
            {
                data.map((value, index) => (
                        <div className="flex" key={index}>
                            <div className="item">
                                <div className="info">
                                    <h3 className='name text-dark'>{value.username}</h3>
                                </div>
                            </div>
                            <div className="item">
                                <span>score: {value.score}</span>
                                <br></br>
                                <span>time: {value.time}</span>
                            </div>
                        </div>
                    )
                )
            }
        </>


    )
}