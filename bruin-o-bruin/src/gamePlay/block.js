import React from 'react';
import "./gamePlay.css"

class Block extends React.Component{
    render() {
        const layer = this.props.block.layer;
        const row = this.props.block.row;
        const col = this.props.block.col;
        const category = this.props.block.category;
        const left = (34 * (this.props.coor[layer][0] + col * 2)) + window.innerWidth / 4
        const top = (34 * (this.props.coor[layer][1] + row * 2)) + window.innerHeight / 4
        const style = this.props.block.fill ? {visibility: "visible", zIndex: 1000 - layer, left: left, top: top} 
                        : {visibility: "hidden", zIndex: 0, left: left, top: top};
        return (
            <button className="block" style={style} onClick={() => this.props.onClick(layer, row, col)}> 
                {category}
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }

}

export default Block;

