import React from 'react'
import "./gamePlay.css"


class Shuffle extends React.Component{
    render(){
        return (
            <button className="shuffle"> 
                <img className="shuffle-icon" src={this.props.img} alt="shuffle icon" onClick={() => this.props.onClick()} />
            </button> 
        )
    }
}
export default Shuffle