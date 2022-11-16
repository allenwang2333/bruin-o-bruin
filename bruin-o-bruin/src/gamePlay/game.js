import Board from "./board.js"
import Hand from "./hand.js"
import randomPlace from "./randomPlace.js"
import React from "react"
import Layout from "./layout.json"

class Game extends React.Component{
    constructor(){
        super();
        /*
        const layer0 = Array(6).fill(Array(6).fill({
                layer: 0,
                row: null,
                col: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer1 = Array(5).fill(Array(5).fill({
                layer: 1,
                row: null,
                col: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer2 = Array(4).fill(Array(4).fill({
                layer: 2,
                row: null,
                col: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer3 = Array(3).fill(Array(3).fill({
                layer: 3,
                row: null,
                col: null,
                category: null,
                parent: null,
                child: null,
            }))
        const layer4 = Array(3).fill(Array(3).fill({
                layer: 4,
                row: null,
                col: null,
                category: null,
                parent: null,
                child: null,
            }))
        */
        const cLayout = () => JSON.parse(JSON.stringify(Layout));
        const layer0 = [cLayout[0].layer0[0].row0[0], 
                        cLayout[0].layer0[0].row1[0], 
                        cLayout[0].layer0[0].row2[0], 
                        cLayout[0].layer0[0].row3[0], 
                        cLayout[0].layer0[0].row4[0],
                        cLayout[0].layer0[0].row5[0],
                        cLayout[0].layer0[0].row6[0]];
        const layer1 = [cLayout[0].layer1[0].row0[0],
                        cLayout[0].layer1[0].row1[0],
                        cLayout[0].layer1[0].row2[0],
                        cLayout[0].layer1[0].row3[0],
                        cLayout[0].layer1[0].row4[0],
                        cLayout[0].layer1[0].row5[0]];
        const layer2 = [cLayout[0].layer2[0].row0[0],
                        cLayout[0].layer2[0].row1[0],
                        cLayout[0].layer2[0].row2[0],
                        cLayout[0].layer2[0].row3[0],
                        cLayout[0].layer2[0].row4[0]];
        const layer3 = [cLayout[0].layey3[0].row0[0],
                        cLayout[0].layer3[0].row1[0],
                        cLayout[0].layer3[0].row2[0],
                        cLayout[0].layer3[0].row3[0]];   
        const layer4 = [cLayout[0].layey4[0].row0[0],
                        cLayout[0].layer4[0].row1[0],
                        cLayout[0].layer4[0].row2[0],
                        cLayout[0].layer4[0].row3[0]];
        const layer5 = [cLayout[0].layey5[0].row0[0],
                        cLayout[0].layer5[0].row1[0],
                        cLayout[0].layer5[0].row2[0],
                        cLayout[0].layer5[0].row3[0]];   

        var board = [layer0, layer1, layer2, layer3, layer4, layer5];
        console.log(board);
        const seen = this.checkSeen(board);
        this.state = {
            board: board,
            seen: seen,
            hand: Array(7).fill({category: null}),
            handSize: 0,
        }
    }

    checkSeen(){
        return [[0, 0, 0], [0, 0, 1], [0, 0, 2]]; //*TODO This is simply for testing purposes
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