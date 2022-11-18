import Board from "./board.js"
import Hand from "./hand.js"
import React from "react"
import "./gamePlay.css"
import randomPlaceBlock from "./randomPlace.js"

class Game extends React.Component{
    constructor(){
        super();
        const cLayout = require("./layout.json")
        var board = cLayout.board;
        board = randomPlaceBlock(board, [1,2,3,4,5], 90)
        const seen = this.initSeen(board);
        this.state = {
            board: board,
            seen: seen,
            hand: Array(7).fill(null),
            handSize: 0,
        }
    }

    initSeen(board){
        var seen = [];
        for(const layer in board){
            for(const row in board[layer]){
                for(const col in board[layer][row]){
                    const curr = board[layer][row][col];
                    if(curr.fill === 1 && curr.parent == null){
                        seen.push([layer, row, col]);
                    }
                }
            }
        }
        return seen; //*TODO This is simply for testing purposes
    }

    checkSeen(layer, row, col, i){
        var board = this.state.board;
        var seen = this.state.seen;
        var curr = board[layer][row][col];
        var child = curr.child;
        seen.splice(i, 1);
        for(let j = 0; j < child.length; j++){
            const index = child[j];
            var idx;
            for(let i = 0; i < board[index[0]][index[1]][index[2]].parent.length; i++){
                if(JSON.stringify(board[index[0]][index[1]][index[2]].parent[i])
                    === JSON.stringify([layer, row, col])){
                    idx = i;
                    break;
                }
            }
            board[index[0]][index[1]][index[2]].parent.splice(idx, 1);
            if(board[index[0]][index[1]][index[2]].parent.length === 0)
                seen.push(index);
        }
        board[layer][row][col].child = null;
        this.setState({
            board: board,
            seen: seen,
        })
    }

    handleClick(layer, row, col){
        var board = this.state.board;
        if(board[layer][row][col].fill === 0)
            return;    
        var seen = this.state.seen;
        var hand = this.state.hand;
        var handSize = this.state.handSize;
        const coor = JSON.stringify([layer.toString(), row.toString(), col.toString()])
        var idx = -1;
        for(let i = 0; i < seen.length; i++){
            if(JSON.stringify(seen[i]) === coor){
                idx = i;
                break;
            }
        }
        if(idx !== -1){
            this.checkSeen(layer, row, col, idx);
            if(handSize === 7){
                console.log("You Loose") //TODO How end game is shown
            }else{
                hand[handSize++] = board[layer][row][col].category;
            }
            board[layer][row][col].fill = 0;
            board[layer][row][col].category = null;
            this.setState({
                board: board,
                hand: hand,
                handSize: handSize,
            });
            this.handleEliminate();
        }
    }

    handleEliminate(){
        //TODO
    }

    render(){
        return (
            <div className="gameBody">
                <Board board={this.state.board} onClick={(i, r, c) => this.handleClick(i, r, c)}/>
                <Hand hand={this.state.hand}/>
            </div>
        )
    }
}

export default Game;