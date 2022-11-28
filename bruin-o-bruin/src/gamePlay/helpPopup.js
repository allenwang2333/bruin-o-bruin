import React from 'react';
import Popup from 'reactjs-popup';

class HelpMessage extends React.Component {
    home() {
        window.location.href = "/home";
    }

    restart() {
        window.location.reload();
    }

    render() {
        return (
            <Popup className='help-popup'
                trigger={() => (
                    <button className="tool-button">
                        <img className="help-icon" src={this.props.helpImg} alt="help icon" />
                    </button>
                )}
                position="bottom left"
                closeOnDocumentClick
            >
                <div className='help-text'>
                    <p>
                        Each player has 5 slots (hand) to store blocks.<br />
                        Click a block on the board to move the block to hand.<br />
                        When there are three identical blocks in hand, they will be eliminated.<br />
                        You can shuffle the blocks on the board by the shuffle button.<br />
                        Each elimination grants you 100 pts. Each shuffle deducts 1000 pts.<br />
                        When your hand is full or you reach negative pts, you lose.<br />
                        When the board is clear, you win.
                    </p>
                </div>
            </Popup>
        )
    }
}

export default HelpMessage;