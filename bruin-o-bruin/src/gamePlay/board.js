import React from "react";
import Layer from "./layer.js"
import "./gamePlay.css"

class Board extends React.Component{
    render(){
        var board = this.props.board;
        return (
            <div className="board">
                {board.map((layer, index) => <Layer layer={layer} key={index} zIndex={1000 - index} onClick={(l, r, c) => this.props.onClick(l, r, c)}/>)}
            </div>
        )
    }
}

export default Board;