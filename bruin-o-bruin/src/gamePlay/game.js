import Board from "./board.js"
import Hand from "./hand.js"
import React from "react"
import axios from "axios";
import "./gamePlay.css"
import randomPlaceBlock from "./randomPlace.js"

async function handleSuccess() {
    const params = new URLSearchParams();
    params.append('author_name', sessionStorage.getItem("userName"));
    params.append('author_id', sessionStorage.getItem("userID"));
    const response = await axios.post('http://localhost:8080/success', params);
    if (response.data[0].valid) {
        alert("You won!")
        window.setTimeout(function () {
            window.location.href = "/home";
        }, 1500);
    } else {
        alert(response.data[1].message);
    }
}

class Game extends React.Component {

    constructor() {
        super();
        const cLayout = require("./layout.json")
        var board = cLayout.board;
        const coor = cLayout["board-coor"]
        board = randomPlaceBlock(board, [1, 2, 3, 4, 5], cLayout.count)
        const seen = this.initSeen(board);
        this.state = {
            board: board,
            seen: seen,
            hand: Array(7).fill(null),
            handSize: 0,
            coor: coor,
        }
    }

    initSeen(board) {
        var seen = [];
        for (const layer in board) {
            for (const row in board[layer]) {
                for (const col in board[layer][row]) {
                    const curr = board[layer][row][col];
                    if (curr.fill === 1 && curr.parent == null) {
                        seen.push([layer, row, col]);
                    }
                }
            }
        }
        return seen; //*TODO This is simply for testing purposes
    }

    checkSeen(layer, row, col, i) {
        var board = this.state.board;
        var seen = this.state.seen;
        var curr = board[layer][row][col];
        var child = curr.child;
        seen.splice(i, 1);
        if (child == null)
            return
        for (let j = 0; j < child.length; j++) {
            var index = child[j];
            var idx;
            for (let i = 0; i < board[index[0]][index[1]][index[2]].parent.length; i++) {
                if (JSON.stringify(board[index[0]][index[1]][index[2]].parent[i])
                    === JSON.stringify([layer, row, col])) {
                    idx = i;
                    break;
                }
            }
            board[index[0]][index[1]][index[2]].parent.splice(idx, 1);
            if (board[index[0]][index[1]][index[2]].parent.length === 0) {
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

    handleClick(layer, row, col) {
        var board = this.state.board;
        if (board[layer][row][col].fill === 0)
            return;
        var seen = this.state.seen;
        var hand = this.state.hand;
        var handSize = this.state.handSize;
        const coor = JSON.stringify([layer.toString(), row.toString(), col.toString()])
        var idx = -1;
        for (let i = 0; i < seen.length; i++) {
            if (JSON.stringify(seen[i]) === coor) {
                idx = i;
                break;
            }
        }
        if (idx !== -1) {
            this.checkSeen(layer, row, col, idx);
            if (handSize === 7) {
                console.log("You Loose") //TODO How end game is shown
            } else {
                hand[handSize++] = board[layer][row][col].category;
            }
            board[layer][row][col].fill = 0;
            board[layer][row][col].category = null;
            this.setState({
                board: board,
                hand: hand,
                handSize: handSize,
            });
        }
    }

    render() {
        return (
            <div className="gameBody">
                <Board board={this.state.board} coor={this.state.coor} onClick={(i, r, c) => this.handleClick(i, r, c)} />
                <Hand hand={this.state.hand} />
            </div>
        )
    }
}

export default Game;