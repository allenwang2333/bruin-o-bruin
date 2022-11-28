import React from 'react';

class HandBlock extends React.Component {
    renderBlock() {
        if (this.props.block === null)
            return (<button className="handBlock"></button>)
        else
            return (<button className="handBlock">
                <img src={this.props.block} alt="" className='block-img' />
            </button>)
    }

    render() {
        return (
            this.renderBlock()
        )
    }
}

export default HandBlock;