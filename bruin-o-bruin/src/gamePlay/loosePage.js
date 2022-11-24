import React from 'react';
import Popup from 'reactjs-popup';

class LooseDisplay extends React.Component {
    render() {
        return (
            <Popup open={this.props.loose} position="center" className='popup'>
                <div className='message'>
                    <p>
                        Your hand is full.
                    </p>
                    <p>
                        You loose the game.
                    </p>
                </div>
                <div className='function-button'>
                    <button className='popup-button'>Home</button>
                    <button className='popup-button'>Restart</button>
                </div>
            </Popup>
        )
    }
}

export default LooseDisplay;