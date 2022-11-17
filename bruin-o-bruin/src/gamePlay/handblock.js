import React from 'react';

class HandBlock extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            layer: null,
            col: null,
            row: null,
            category: this.props.block.category,
            parent: null,
            child: null,
        };
    }


    render() {
        return (
            <button className="handblock" onClick={this.props.onClick()}> 
                Category is {this.props.block.category}
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }
}

export default HandBlock;