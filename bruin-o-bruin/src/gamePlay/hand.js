import React from 'react';
import HandBlock from './handblock.js';
import "./gamePlay.css"

class Hand extends React.Component{
    renderBlockAtHand(i) {
        return (
            /* TODO: change return value and handle click might be added if case of unplacing blocks from hand back to board */
            <HandBlock
                block={this.props.hand[i]}
            />
            
        )
    }

    render() {
        return (
            <div className="at-hand">
                {this.renderBlockAtHand(0)}
                {this.renderBlockAtHand(1)}
                {this.renderBlockAtHand(2)}
                {this.renderBlockAtHand(3)}
                {this.renderBlockAtHand(4)}
                {this.renderBlockAtHand(5)}
                {this.renderBlockAtHand(6)}
            </div>
            /* Render the blocks at hand */
            /* MIGHT CHANGE */
        )
    }
}

export default Hand;