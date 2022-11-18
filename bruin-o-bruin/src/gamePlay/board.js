import React from "react";
import Layer from "./layer.js"
import "./gamePlay.css"

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board: this.props.board,
        }
    }

    render(){
        var board = this.state.board;
        return (
            <div className="board">
                {board.map((layer, index) => <Layer layer={layer} key={index} onClick={(l, r, c) => this.props.onClick(l, r, c)}/>)}
            </div>
        )
    }
}

export default Board;