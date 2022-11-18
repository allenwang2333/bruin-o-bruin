import React from 'react';
import "./gamePlay.css"

class Block extends React.Component{
    render() {
        const layer = this.props.block.layer;
        const row = this.props.block.row;
        const col = this.props.block.col;
        const category = this.props.block.category;
        return (
            <button className="block" onClick={() => this.props.onClick(layer, row, col)}> 
                {category}
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }

}

export default Block;

