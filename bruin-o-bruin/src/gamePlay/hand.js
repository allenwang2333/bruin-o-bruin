import React from 'react';
import HandBlock from './handblock.js';

class Hand extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blocks: this.props.hand,
        /* TODO: Add more state or lift up */
        };
    }

    non_reponse_onClick(){

    }

    renderBlockAtHand(i) {
        return (
            /* TODO: change return value and handle click might be added if case of unplacing blocks from hand back to board */
            <HandBlock
                block={this.props.hand[i]}
                onClick={this.non_reponse_onClick}
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