import React from 'react'
import randomPlaceBlock from "./randomPlace.js"
import "./gamePlay.css"


class Shuffle extends React.Component{
    render(){
        return (
            <button className="shuffle"> 
                <img src="url" alt="shuffle icon" onClick={() => this.props.onClick()} />
            </button> 
        )
    }
}
export default Shuffle