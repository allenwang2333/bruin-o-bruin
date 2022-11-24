import React from 'react';
import "./gamePlay.css"

class Block extends React.Component{
    render() {
        const layer = this.props.block.layer;
        const row = this.props.block.row;
        const col = this.props.block.col;
        const image = this.props.img;
        const left = (34 * (this.props.coor[layer][0] - this.props.off[0] + col * 2))
        const top = (34 * (this.props.coor[layer][1] - this.props.off[1] + row * 2))
        const style = this.props.block.fill ? {visibility: "visible", zIndex: 100 - layer, left: left, top: top}
                        : {visibility: "hidden", zIndex: 0, left: left, top: top};
        return (
            <button className="block" style={style} onClick={() => this.props.onClick(layer, row, col)}> 
                <img src={image} alt="" className='button-img'/>
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }

}

export default Block;

