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
                        Each player has a hand area of 7 slots to store blocks.<br />
                        Click on a block in the board to move block to hand.<br />
                        When there are three identical blocks in hand, it eliminates those blocks.<br />
                        You can shuffle the blocks in the board with the shuffle button.<br />
                        Each elimination grants you 100 pts. Each shuffle dedecuts 1000 pts.<br />
                        You loose, when hand slot is full or you reach negative points.<br />
                        You win, when the board is clear.
                    </p>
                </div>
            </Popup>
        )
    }
}

export default HelpMessage;