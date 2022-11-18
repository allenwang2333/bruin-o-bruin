import React from 'react';
import "./gamePlay.css"

class Block extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            layer: this.props.block.layer,
            col: this.props.block.col,
            row: this.props.block.row,
            category: this.props.block.category,
            parent: this.props.block.parent,
            child: this.props.block.child,
        };
    }

    render() {
        const layer = this.state.layer;
        const row = this.state.row;
        const col = this.state.col;
        const category = this.state.category;
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

