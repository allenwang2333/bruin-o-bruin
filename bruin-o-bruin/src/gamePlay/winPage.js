import React from 'react';
import Popup from 'reactjs-popup';

class WinDisplay extends React.Component {
    render() {
        return (
            <Popup open={this.props.win} position="center" closeOnDocumentClick={false} closeOnEscape={false} className='popup'>
                <div className='message'>
                    <p>
                        You Win!
                    </p>
                    <p>
                        The board is clear!
                    </p>
                </div>
            </Popup>
        )
    }
}

export default WinDisplay;