import React from 'react';

class HandBlock extends React.Component{
    render() {
        return (
            <button className="handBlock"> 
                <img src={this.props.block} alt="" className='button-img'/>
            </button> 
            /* TODO: onClick should be lifted up to be handled */
            /* intended to move the block from board to hand or vice versa if case of the undo feature*/
        )
    }
}

export default HandBlock;