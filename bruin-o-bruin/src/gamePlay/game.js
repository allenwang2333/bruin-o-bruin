import Board from "./board.js"
import Hand from "./hand.js"
import React from "react"
import randomPlaceBlock from "./randomPlace.js"
import LooseDisplay from "./loosePage.js"
import WinDisplay from "./winPage.js"
import handleSuccess from "./handleSuccess.js";
import "./gamePlay.css"

class Game extends React.Component {
    constructor() {
        super();
        const category_kind_count = 7
        const cLayout = require("./layout.json")
        var board = cLayout.board;
        const coor = cLayout["board-coor"]
        board = randomPlaceBlock(board, [0, 1, 2, 3, 4, 5, 6], cLayout.count)
        const seen = this.initSeen(board);
        const remain_category = this.initCategory(category_kind_count, cLayout.count)
        const off = cLayout["offset"]
        function importAll(r) {
            return r.keys().map(r);
        }
        const images = importAll(require.context('../../../images/blockImg', false, /\.(png|jpe?g|svg)$/));
        const shuffleImg = importAll(require.context('../../../images', false, /shuffle-icon\.(png|jpe?g|svg)$/));
        const homeImg = importAll(require.context('../../../images', false, /home-icon\.(png|jpe?g|svg)$/));
        const restartImg = importAll(require.context('../../../images', false, /restart-icon\.(png|jpe?g|svg)$/));
        this.state = {
            board: board,
            seen: seen,
            hand: Array(7).fill(null),
            handSize: 0,
            category: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
            coor: coor,
            off: off,
            images: images,
            shuffleImg: shuffleImg,
            homeImg: homeImg,
            restartImg: restartImg,
            remain: cLayout.count,
            remain_category: remain_category,
            loose: false,
            win: false,
            score: 0,
        }
    }

    initCategory(category_kind_count, total_count) {
        const each_kind_count = Math.floor((Math.floor(total_count / 3)) / category_kind_count) * 3
        var remain_category = {}
        for (let i = 0; i < category_kind_count; i++) {
            remain_category[i] = each_kind_count
        }
        // remain block count should be multiple of 3
        const remain_block_count = total_count - each_kind_count * category_kind_count
        const remain_kind_count = remain_block_count / 3
        for (let i = 0; i < remain_kind_count; i++) {
            remain_category[Math.floor(Math.random() * category_kind_count)] += 3;
        }
        return remain_category
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
        var remain_category = this.state.remain_category;
        if (board[layer][row][col].fill === 0)
            return;
        var seen = this.state.seen;
        var remain = this.state.remain;
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
            this.handleEliminate(board[layer][row][col].category);
            remain--;
            if (remain === 0) {
                handleSuccess(this.state.score)
                this.setState({
                    win: true,
                })
            }
            remain_category[board[layer][row][col].category]--; // new
            board[layer][row][col].fill = 0;
            board[layer][row][col].category = null;
            this.setState({
                board: board,
                remain: remain,
                remain_category: remain_category  // new
            });
        }
    }

    handleEliminate(newHand) {
        var hand = Array(7).fill(null);
        var handSize = this.state.handSize;
        var category = this.state.category;
        var score = this.state.score;
        category[newHand]++;
        handSize++;
        if (category[newHand] === 3) {
            category[newHand] = 0;
            score += 100;
            handSize -= 3;
        }
        if (handSize === 7) {
            this.setState({
                loose: true,
            })
        }
        var categoryCopy = {};
        Object.assign(categoryCopy, category);
        var handIdx = 0;
        var categoryIdx = 0;
        while (handIdx < 7) {
            while (categoryIdx <= 6 && category[categoryIdx] === 0)
                categoryIdx++;
            if (categoryIdx === 7)
                break;
            hand[handIdx++] = this.state.images[categoryIdx];
            category[categoryIdx]--;
        }
        this.setState({
            hand: hand,
            category: categoryCopy,
            handSize: handSize,
            score: score,
        })
    }

    handleShuffleClick(remain_category) {
        const score = this.state.score - 500;
        var board = this.state.board
        var copy_remain_category = { ...remain_category }
        var category_list = Object.keys(copy_remain_category)
        var category_count_list = Object.values(copy_remain_category)
        for (const layer in board) {
            for (const row in board[layer]) {
                for (const col in board[layer][row]) {
                    if (board[layer][row][col].fill) {
                        let curr;
                        do {
                            curr = Math.floor(Math.random() * category_list.length);
                        } while (category_count_list[curr] === 0);
                        board[layer][row][col].category = category_list[curr];
                        category_count_list[curr]--;
                    }
                }
            }
        }
        this.setState(
            {
                board: board,
                score: score,
            }
        )
    }

    render() {
        return (
            <div>
                <div className="tool">
                    <button className="tool-button">
                        <img className="shuffle-icon" src={this.state.shuffleImg[0]} alt="shuffle icon" onClick={() => this.handleShuffleClick(this.state.remain_category)} />
                    </button>
                    <button className="tool-button">
                        <img className="home-icon" src={this.state.homeImg[0]} alt="home icon" onClick={() => window.location.href = "/home"} />
                    </button>
                    <button className="tool-button">
                        <img className="restart-icon" src={this.state.restartImg[0]} alt="restart icon" onClick={() => window.location.reload()} />
                    </button>
                </div>
                <div className="score-display">
                    <p className="score">
                        Score: {this.state.score}
                    </p>
                </div>
                <div className="gameBody">
                    <Board board={this.state.board} coor={this.state.coor} off={this.state.off}
                        images={this.state.images} onClick={(i, r, c) => this.handleClick(i, r, c)} />
                    <Hand hand={this.state.hand} />
                    <LooseDisplay loose={this.state.loose} />
                    <WinDisplay win={this.state.win} />
                </div>
            </div>
        )
    }
}

export default Game;