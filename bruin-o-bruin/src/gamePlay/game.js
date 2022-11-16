import Board from "./board.js"
import Hand from "./hand.js"
import randomPlace from "./randomPlace.js"
import React from "react"
import "./gamePlay.css"

class Game extends React.Component{
    constructor(){
        super();
        const layer0 = Array(6).fill(Array(6).fill({
                layer: 0,
                col: null,
                row: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer1 = Array(5).fill(Array(5).fill({
                layer: 1,
                col: null,
                row: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer2 = Array(4).fill(Array(4).fill({
                layer: 2,
                col: null,
                row: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer3 = Array(3).fill(Array(3).fill({
                layer: 3,
                col: null,
                row: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer4 = Array(3).fill(Array(3).fill({
                layer: 4,
                col: null,
                row: null,
                category: null,
                parent: null,
                child: null,
            }))
        var board = [layer0, layer1, layer2, layer3, layer4];
        const seen = this.initSeen(board);
        this.state = {
            board: board,
            seen: seen,
            hand: Array(7).fill({category: null}),
            handSize: 0,
        }
    }

    initSeen(board){
        var seen = [];
        for(const layer in board){
            for(const row in board[layer]){
                for(const col in board[layer][row]){
                    const curr = board[layer][row][col];
                    if(curr.fill && curr.parent === [])
                        seen.concat([layer, row, col]);
                }
            }
        }
        return seen; //*TODO This is simply for testing purposes
    }

    checkSeen(curr, child){
        var board = this.state.board;
        var seen = this.state.seen;
        seen.splice(seen.indexOf(curr))
        for(const index in child){
            var idx = board[index[0]][index[1]][index[2]].parent.indexOf(curr);
            board[index[0]][index[1]][index[2]].parent.splice(idx, 1);
            if(board[index[0]][index[1]][index[2]].parent.length === 0)
                seen.concat(index);
        }
        this.setState({
            board: board,
            seen: seen,
        })
    }

    handleClick(layer, row, col){
        var seen = this.state.seen;
        var board = this.state.board;
        var hand = this.state.hand;
        var handSize = this.state.handSize;
        if(seen.findIndex(e => e == [layer, row, col]) != -1){
            seen = this.checkSeen();    
            if(handSize == 7){
                console.log("You Loose") //TODO How end game is shown
            }else{
                hand[handSize++] = board[layer][row][col];
            }
            board[layer][row][col] = 0;
            this.setState({
                board: board,
                seen: seen,
                hand: hand,
                handSize: handSize,
            })
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