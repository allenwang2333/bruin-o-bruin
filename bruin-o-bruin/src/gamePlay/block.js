//This file contains the implementation of individual block of the game.

class Block{
    constructor() {
        this.state = { 
            id: null,            // id of each block
            set: null,           // will be name of set of block we have, blocks of the same set will be eliminated if three of the same set at hand 
            xCoord: null,          // coordinates of the block
            yCoord: null,
            depth: null,           // might be helpful when determining the isUnder state
            isUnder: null,       // whether it is under another layer of block or not
            status: null,        // -1 means unplaced
                                 // 0 means on the board unselected
                                 // 1 means on hand selected
                                 // 2 means at hand eliminated
            icon: null,          // string to the path of icon
            /* TODO: modify/add/remove state */
        };
    }


    render() {
        return (
            <button className="block"> 
                <img src={this.state.icon} 
                onClick={() => console.log('click')}/> 
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }
}

