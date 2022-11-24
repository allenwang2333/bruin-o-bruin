import Board from "./board.js"
import Hand from "./hand.js"
import React from "react"
import "./gamePlay.css"
import randomPlaceBlock from "./randomPlace.js"
import LooseDisplay from "./loosePage.js"
import WinDisplay from "./winPage.js"

class Game extends React.Component{
    constructor(){
        super();
        const cLayout = require("./layout.json")
        var board = cLayout.board;
        const coor = cLayout["board-coor"]
        board = randomPlaceBlock(board, [1,2,3,4,5], cLayout.count)
        const seen = this.initSeen(board);
        this.state = {
            board: board,
            seen: seen,
            hand: Array(7).fill(null),
            handSize: 0,
            category: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0},
            coor: coor,
            remain: cLayout.count,
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
        if(child == null)
            return
        for(let j = 0; j < child.length; j++){
            var index = child[j];
            var idx;
            for(let i = 0; i < board[index[0]][index[1]][index[2]].parent.length; i++){
                if(JSON.stringify(board[index[0]][index[1]][index[2]].parent[i])
                    === JSON.stringify([layer, row, col])){
                    idx = i;
                    break;
                }
            }
            board[index[0]][index[1]][index[2]].parent.splice(idx, 1);
            if(board[index[0]][index[1]][index[2]].parent.length === 0){
                index = [index[0].toString(), index[1].toString(), index[2].toString()]
                seen.push(index);
            }
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
        var remain = this.state.remain;
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
            this.handleEliminate(board[layer][row][col].category);
            remain--;
            if(remain === 0){
                console.log("You win")
            }
            board[layer][row][col].fill = 0;
            board[layer][row][col].category = null;
            this.setState({
                board: board,
                remain: remain,
            });
        }
    }

    handleEliminate(newHand){
        var hand = Array(7).fill(null);
        var handSize = this.state.handSize;
        var category = this.state.category;
        category[newHand]++;
        handSize++;
        if(category[newHand] === 3){
            category[newHand] = 0;
            handSize -= 3;
        }
        if(handSize === 7){
            console.log("You loose");
        }
        var categoryCopy = {};
        Object.assign(categoryCopy, category);
        var handIdx = 0;
        var categoryIdx = 1;
        while(handIdx < 7){
            while(categoryIdx <= 5 && category[categoryIdx] === 0)
                categoryIdx++;
            if(categoryIdx === 6)
                break;
            hand[handIdx++] = categoryIdx;
            category[categoryIdx]--;
        }
        this.setState({
            hand: hand,
            category: categoryCopy,
            handSize: handSize,
        })
    }

    render(){
        return (
            <div className="gameBody">
                <Board board={this.state.board} coor={this.state.coor} onClick={(i, r, c) => this.handleClick(i, r, c)}/>
                <Hand hand={this.state.hand}/>
                <LooseDisplay loose={this.state.loose}/>
                <WinDisplay win={this.state.win}/>
            </div>
        )
    }
}

export default Game;