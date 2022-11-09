import React, {useEffect, useState} from 'react';
import './index.css';
import ReactDom from 'react-dom';

// TODO: Pictures should be added later to replace letters
const gameItemsArr = [
    {name: 'A', color: '#5470c6', position: [null, null, null], display: false},
    {name: 'A', color: '#5470c6', position: [null, null, null], display: false},
    {name: 'A', color: '#5470c6', position: [null, null, null], display: false},
    {name: 'B', color: '#fac858', position: [null, null, null], display: false},
    {name: 'B', color: '#fac858', position: [null, null, null], display: false},
    {name: 'B', color: '#fac858', position: [null, null, null], display: false},
    {name: 'C', color: '#ee6666', position: [null, null, null], display: false},
    {name: 'C', color: '#ee6666', position: [null, null, null], display: false},
    {name: 'C', color: '#ee6666', position: [null, null, null], display: false},
    {name: 'D', color: '#73c0de', position: [null, null, null], display: false},
    {name: 'D', color: '#73c0de', position: [null, null, null], display: false},
    {name: 'D', color: '#73c0de', position: [null, null, null], display: false},
    {name: 'E', color: '#3bd272', position: [null, null, null], display: false},
    {name: 'E', color: '#3bd272', position: [null, null, null], display: false},
    {name: 'E', color: '#3bd272', position: [null, null, null], display: false},
    {name: 'F', color: '#9a60b4', position: [null, null, null], display: false},
    {name: 'F', color: '#9a60b4', position: [null, null, null], display: false},
    {name: 'F', color: '#9a60b4', position: [null, null, null], display: false},
    {name: 'G', color: '#ea7ccc', position: [null, null, null], display: false},
    {name: 'G', color: '#ea7ccc', position: [null, null, null], display: false},
    {name: 'G', color: '#ea7ccc', position: [null, null, null], display: false},
    {name: 'H', color: '#c14cac', position: [null, null, null], display: false},
    {name: 'H', color: '#c14cac', position: [null, null, null], display: false},
    {name: 'H', color: '#c14cac', position: [null, null, null], display: false},
    {name: 'I', color: '#f08300', position: [null, null, null], display: false},
    {name: 'I', color: '#f08300', position: [null, null, null], display: false},
    {name: 'I', color: '#f08300', position: [null, null, null], display: false},
    {name: 'J', color: '#004eff', position: [null, null, null], display: false},
    {name: 'J', color: '#004eff', position: [null, null, null], display: false},
    {name: 'J', color: '#004eff', position: [null, null, null], display: false},
    {name: 'K', color: '#00e4ff', position: [null, null, null], display: false},
    {name: 'K', color: '#00e4ff', position: [null, null, null], display: false},
    {name: 'K', color: '#00e4ff', position: [null, null, null], display: false},
    {name: 'L', color: '#c0e8ff', position: [null, null, null], display: false},
    {name: 'L', color: '#c0e8ff', position: [null, null, null], display: false},
    {name: 'L', color: '#c0e8ff', position: [null, null, null], display: false},
];

// Generate Game Items
const itemsArr = (level) => {
    let arr = [...gameItemsArr];
    // Determine how many items on each level --> Can be changed later
    const floorItemsArr = [9, 16, 25, 36, 49, 64, 81];
    const floorNumsArr = [3, 4, 5, 6, 7, 8, 9];

    // How many empty items on each level
    const noItemsNum = [7, 14, 14, 24, 49, 40];
    // How many items on each level
    const itemsNum = [18, 36, 72, 111, 150, 240];

    // empty item array for the array below
    const noItemsArr = [];
    let i = noItemsNum[level - 1];
    while (i > 0) {
        noItemsArr.push({name: '', color: '', position: [null, null, null], display: false});
        i--;
    }

    // get array items that's not completed
    const getArrItems = ((itemsNum[level - 1] / 3) % 12) * 3;
    const otherItemsArr = arr
        .map((i, index) => {
            if (index < getArrItems) {
                return i;
            }
            return null;
        })
        .filter((i) => i);

    // Designed different levels for different skill levels
    let itemsNumsArr = [];
    if (level === 1) itemsNumsArr = otherItemsArr;

    if (level === 2) itemsNumsArr = arr;

    if (level === 3) itemsNumsArr = arr.concat(arr);

    if (level === 4) {
        arr = [...gameItemsArr];
        itemsNumsArr = arr.concat(arr, arr, otherItemsArr);
    }
    if (level === 5) {
        arr = [...gameItemsArr];
        itemsNumsArr = arr.concat(arr, arr, arr, otherItemsArr);
    }
    if (level === 6) {
        arr = [...gameItemsArr];
        itemsNumsArr = arr.concat(arr, arr, arr, arr, arr, otherItemsArr);
    }

    const allItems = itemsNumsArr.concat(noItemsArr).sort(() => Math.random() - 0.5);

    const resultArr = [];

    floorItemsArr.splice(0, level + 1).map((item, fIndex) => {
        resultArr.push(allItems.splice(0, item));
    });


    const zIndex = [6, 5, 4, 3, 2, 1];
    return resultArr.map((item, index) => {
        return {
            arr: [
                ...item.map((i, j) => {
                    i.position = [index + 1, parseInt(j / floorNumsArr[index]) + 1, (j + 1) % floorNumsArr[index] || floorNumsArr[index]];
                    return {...i};
                }),
            ],
            zIndex: zIndex[index],
            width: (index + 3) * 55,
        };
    });
};

// Determine whether the selected item can be clicked
const isItemCanClick = (item, allItems) => {
    const nowItem = {...item};
    const nowItemFloor = nowItem.position[0];
    // The button floor --> doesn't matter
    // if (nowItemFloor === allItems.length) return;

    const upFloor = allItems[nowItemFloor - 2]?.arr.filter((itemNow) => itemNow.name !== '') || [];

    if (upFloor.length === 0) return true;
    let midArr = [];
    upFloor.map((itemNowM) => {
        const position = itemNowM.position;
        const a = [position[0] + 1, position[1], position[2]];
        const b = [position[0] + 1, position[1], position[2] + 1];
        const c = [position[0] + 1, position[1] + 1, position[2]];
        const d = [position[0] + 1, position[1] + 1, position[2] + 1];
        midArr.push(a);
        midArr.push(b);
        midArr.push(c);
        midArr.push(d);
    });

    return midArr.filter((mItem) => nowItem.position[0] === mItem[0] && nowItem.position[1] === mItem[1] && nowItem.position[2] === mItem[2])
        .length === 0;
};


let hasThreeItem = 0;
let length = 0;
const GameBox = () => {
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [gameItemsArr, setGameItemsArr] = useState(itemsArr(level));
    const [operateArr, setOperateArr] = useState([]);
    // Determine whether promote to next level
    useEffect(() => {
        if (length === 7) {
            setScore("Fail")
            window.location.reload()

        }

        if (gameItemsArr.length === 0) {
            alert(`Congratulation to pass level ${level}!!!`);
            if (level === 6) {
                alert('Congratulation!!!');
                return;
            }
            setLevel((prev) => prev + 1);
            setGameItemsArr((prev) => {
                prev = itemsArr(level + 1);
                return [...prev];
            });
        }
    }, [gameItemsArr, level]);
    // Click an item --> can move it
    const moveItem = (item, index, whichFloor) => {
        hasThreeItem = 0;
        let hasThreeindex = 0;
        // Put the item to the operation area
        setOperateArr((prev) => {
            const currentIndex = prev.findIndex((k) => k.name === item.name);
            if (currentIndex > -1) {
                prev.splice(currentIndex, 0, item);
            } else {
                prev.push(item);
            }
            length = prev.length;
            return [...prev];
        });
        // Change the original array
        setGameItemsArr((prev) => {
            prev[whichFloor].arr.splice(index, 1, {...item, name: '', color: ''});
            if (prev[prev.length - 1].arr.filter((item) => item.name !== '').length === 0) {
                return [];
            } else {
                return [...prev];
            }
        });

        // Determine whether the item can be removed
        operateArr.map((newItem, newIndex) => {
            if (newItem.name === item.name) {
                hasThreeItem++;
                hasThreeindex = newIndex;
            }
            return null;
        });
        // If there are 3 same item --> removed
        if (hasThreeItem === 2) {
            setOperateArr((prev) => {
                prev.splice(hasThreeindex - 1, 3);
                length = prev.length;
                return [...prev];
            });
            setScore((prev) => prev + 100);
        }
    };

    return (
        <div className="gamebox">
            {/* Title Area */}
            <div className="titleArea">
                <div className="titleAreaTitle">Bruin-O-Bruin</div>
                <div className="titleAreaScore">
                    <div>
                        <span>Level </span>
                        <span>{level}</span>

                    </div>
                    <div>
                        <span>Score:</span>
                        <span>{score}</span>
                    </div>

                </div>
            </div>
            {/* Game Area */}
            <div className="gameArea">
                {gameItemsArr.map((item, index) => {
                    return (
                        <div
                            className="gameAreaFloor"
                            key={item.zIndex}
                            style={
                                item.arr.filter((k) => k.name !== '').length !== 0
                                    ? {zIndex: item.zIndex, width: item.width, height: item.width}
                                    : {display: 'none'}
                            }>
                            {item.arr.map((gameItem, gameIndex) => {
                                return (
                                    <div
                                        onClick={() => {
                                            if (gameItem.name === '' || !isItemCanClick(gameItem, gameItemsArr)) return;

                                            moveItem(gameItem, gameIndex, index);
                                        }}
                                        key={gameIndex}
                                        style={
                                            gameItem.name === ''
                                                ? {opacity: 0, pointerEvents: 'none'}
                                                : isItemCanClick(gameItem, gameItemsArr)
                                                    ? {background: gameItem.color}
                                                    : {background: '#c2cbcbee'}
                                        }
                                        className="gameItem">
                                        {gameItem.name}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>

            {/* Box Below */}
            <div className="operateArea">
                {operateArr.map((item, index) => {
                    return (
                        <div key={index} style={{background: item.color}} className="gameItemOperate">
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
// TODO: Seperate the code into Game and Board
// TODO: Add functionality of scoreboard

ReactDom.render(<GameBox/>, document.getElementById('root'));


/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// The square that user can click and move
// FIXME: Add features to the blocks
function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

// Creating the game board of Bruin-O-Bruin
class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    // FIXME - Board needs to be different
    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

// Added finalMove to determine whether O or X can win the game
class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            // TODO: history of movements --> maybe don't need it
            history: [
                {
                    squares: Array(24).fill(null) // the history of all block movements
                }
            ],
            gameStatus: 0, // game status --> 0 = initial; 1 = in-game; 2 = fail; 3 = succeed
            // Level Blocks
            // Random Blocks Area
            // Slot Area
            // Slot area available
            // TODO: Save all blocks

            totalBlockNum: 1, // TODO: need change
            clearBlockNUm: 0, // TODO: blocks getting cleared
            // 24x24 for the map of blocks
            boxWidthNum: 24, // assume that there are 24 blocks in width --> can change later
            boxHeightNum: 24, // assume that there are 24 blocks in height --> can change later
            widthBlock: 14, // width of each block is 14
            heightBlock: 14, // height of each block is 14
            // History of the chess board --> 2D Array
            // Operation History

            // TODO: the initial status of all blocks
        }
    }
    // To initialize a specific size board
    // TODO: maybe put it to Board Class
    initChessBoard = function (width, height) {

    };

    initGame = function(){
        //console.log("initGame", gameConfig);
        // TODO: Set the size of the Board
        // TODO: How many blocks in total

        // TODO: Initialize blocks to show corresponding pictures
        // TODO: put these blocks to the array + randomize the array

        // Shuffle

        // TODO: Calculate the layers of blocks
        // --> so that we can have the X, Y value of each block (also whether they overlaps)

        // Initialize the slot that use to remove blocks

    };
    // Don't need it for now - To make sure that the blocks with the same picture can't overlap
    genLevelBlockPos = (blocks, minX, minY, maxX, maxY) => {
    };
    // TODO: Find out the relationship between blocks
    genLevelRelation = (block) => {
        // TODO: Which layer each block is in
    }


    // TODO: move and drag
    handleClick(i) {
        // TODO: Can't click if lost, alrealy clicked block, or a block on above

        // Change the block status --> clicked
        // Remove the block
        // Put the block from map into slot

    }

    // Starting the game
    doStart = () =>{

    }
    // Shuffle
    // Remove a block

    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        // squares={current.squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">

                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/