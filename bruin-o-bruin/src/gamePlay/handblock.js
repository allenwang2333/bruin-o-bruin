import React from 'react';

class HandBlock extends React.Component{
    render() {
        return (
            <button className="handblock"> 
                Category is {this.props.block}
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }
}

export default HandBlock;