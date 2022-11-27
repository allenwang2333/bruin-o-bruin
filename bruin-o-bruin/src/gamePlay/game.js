import Board from "./board.js"
import Hand from "./hand.js"
import React from "react"
import randomPlaceBlock from "./randomPlace.js"
import LooseDisplay from "./loosePage.js"
import WinDisplay from "./winPage.js"
import handleSuccess from "./handleSuccess.js";
import HelpMessage from "./helpPopup.js"
import "./gamePlay.css"

class Game extends React.Component {
    constructor() {
        super();
        //const category_kind_count = 7
        const cLayout = require("./layout.json")
        var board = cLayout.board;
        const coor = cLayout["board-coor"]
        var placeResult = randomPlaceBlock(board, [0, 1, 2, 3, 4, 5, 6], cLayout.count)
        board = placeResult[0]
        const remain_category = placeResult[1]
        const seen = this.initSeen(board);
        //const remain_category = this.initCategory(category_kind_count, cLayout.count)
        const off = cLayout["offset"]
        function importAll(r) {
            return r.keys().map(r);
        }
        const images = importAll(require.context('../../../images/blockImg', false, /\.(png|jpe?g|svg)$/));
        const shuffleImg = importAll(require.context('../../../images/icon', false, /shuffle-icon\.(png|jpe?g|svg)$/))[0];
        const homeImg = importAll(require.context('../../../images/icon', false, /home-icon\.(png|jpe?g|svg)$/))[0];
        const restartImg = importAll(require.context('../../../images/icon', false, /restart-icon\.(png|jpe?g|svg)$/))[0];
        const helpImg = importAll(require.context('../../../images/icon', false, /help-icon\.(png|jpe?g|svg)$/))[0];
        this.updateTimer = this.updateTimer.bind(this);
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
            helpImg: helpImg,
            remain: cLayout.count,
            remain_category: remain_category,
            loose: false,
            win: false,
            score: 0,
            help: false,
            time: { min: 0, sec: 0 },
            second: 0,
            intervalId: null
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

        var handIdx = 0;
        var categoryIdx = 0;
        var categoryCopy = {};
        Object.assign(categoryCopy, category);
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
        })


        hand = Array(7).fill(null)
        if (categoryCopy[newHand] === 3) {
            categoryCopy[newHand] = 0;
            score += 100;
            handSize -= 3;
        }
        if (handSize === 7) {
            this.setState({
                loose: true,
            })
        }
        Object.assign(category, categoryCopy);

        handIdx = 0;
        categoryIdx = 0;
        while (handIdx < 7) {
            while (categoryIdx <= 6 && category[categoryIdx] === 0)
                categoryIdx++;
            if (categoryIdx === 7)
                break;
            hand[handIdx++] = this.state.images[categoryIdx];
            category[categoryIdx]--;
        }
        setTimeout(() => this.setState({
            hand: hand,
            category: categoryCopy,
            handSize: handSize,
            score: score,
        }), 150)
    }

    handleShuffleClick(remain_category) {
        const score = this.state.score - 1000;
        if (score < 0) {
            this.setState({
                loose: true,
            });
        }
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

    helpClick() {
        this.setState({ help: true });
        setTimeout(() => this.setState({help: false}), 500)
    }

    updateTimer() {
        var copy_timer = {...this.state.time}
        const new_second = this.state.second + 1
        if (copy_timer.sec === 59)
        {
            copy_timer.sec = 0;
            copy_timer.min++;
        }
        else
        {
            copy_timer.sec++
        }
        this.setState(
            {
                time: copy_timer,
                second: new_second
            }
        )
    }

    componentDidMount() {
        var intervalId = setInterval(this.updateTimer, 1000);
        this.setState({intervalId: intervalId})
    }

    render() {
        var sec = this.state.time.sec;
        if (sec < 10)
            sec = "0" + sec;
        return (
            <div className="body">
                <div className="tool">
                    <button className="tool-button">
                        <img className="shuffle-icon" src={this.state.shuffleImg} alt="shuffle icon" onClick={() => this.handleShuffleClick(this.state.remain_category)} />
                    </button>
                    <button className="tool-button">
                        <img className="home-icon" src={this.state.homeImg} alt="home icon" onClick={() => window.location.href = "/home"} />
                    </button>
                    <button className="tool-button">
                        <img className="restart-icon" src={this.state.restartImg} alt="restart icon" onClick={() => window.location.reload()} />
                    </button>
                    <HelpMessage helpImg={this.state.helpImg} />
                </div>
                <div className="score-display">
                    <p className="score">
                        Score: {this.state.score}
                    </p>
                </div>
                <div className="timer">
                    Time: {this.state.time.min} m {sec} s
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