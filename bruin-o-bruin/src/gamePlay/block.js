import React from 'react';

class Block extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            layer: this.props.layer,
            col: this.props.col,
            row: this.props.row,
            category: this.props.category,
            parent: this.props.parent,
            child: this.props.child,
        };
    }


    render() {
        const layer = this.state.layer;
        const row = this.state.row;
        const col = this.state.col;
        return (
            <button className="block" onClick={this.props.onClick(layer, row, col)}> 
                {layer},{row},{col}
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }
}

export default Block;