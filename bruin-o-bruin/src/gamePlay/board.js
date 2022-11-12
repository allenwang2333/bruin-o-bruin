import React from "react";
import {Layer} from "./layer.js"

class Board extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            board: this.props.board,
        }
    }

    render(){
        var res = null;
        var board = this.state.board;
        for(var i = 0; i < board.length; i++){
            res +=  <div className="layer">
                        <Layer layer={board[i]}/>
                    </div>
        }

        return {res};
    }
}