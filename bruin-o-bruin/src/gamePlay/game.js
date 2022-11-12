import {Board} from "./board.js"
import {Hand} from "./hand.js"
import {randomPlace} from "./randomPlace.js"
import React from "react"

class Game extends React.Component{
    constructor(){
        var layer1 = [
            [1, 1, 1, 0, 1, 1, 1],
            [0, 1, 1, 1, 1, 1, 0],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 0, 1, 1, 1]
        ]
        var layer2 = [
            [1, 1, 1, 1, 1, 1],
            [1, 1, 0, 0, 1, 1],
            [1, 1, 1, 1, 1, 1],
            [1, 0 ,1, 0, 1, 0],
            [1, 1, 1, 1, 1, 1]
        ]
        var layer3 = [
            [1, 0, 0, 1],
            [1, 1, 1, 1],
            [0, 1, 1, 0],
            [1, 0, 0, 1]
        ]
        var layer4 = [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1],
        ]
        var layer5 = [
            [0, 1, 0],
            [1, 0, 1],
            [0, 1, 0]
        ]
        this.state={
            board: [layer1, layer2, layer3, layer4, layer5],
            seen: this.checkSeen(),
            hand: Array(7).fill(null),
            handSize: 0,
        }
    }

    checkSeen(){
        return [[0, 0, 0], [0, 0, 1], [0, 0, 2]]; //*TODO This is simply for testing purposes
    }

    handleClick(index){
        var seen = this.state.seen;
        var board = this.state.board;
        var hand = this.state.hand;
        var handSize = this.state.handSize;
        if(seen.findIndex(e => e == index) != -1){
            seen = this.checkSeen();    
            if(handSize == 7){
                console.log("You Loose") //TODO How end game is shown
            }else{
                hand[handSize++] = board[index[0]][index[1]][index[2]];
            }
            board[index[0]][index[1]][index[2]] == 0;
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
                <Board board={this.state.board} onClick={index => this.handleClick(index)}/>
                <Hand hand={this.state.hand}/>
            </div>
        )
    }
}