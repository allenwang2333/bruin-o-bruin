import React from 'react';
import Popup from 'reactjs-popup';

class LoseDisplay extends React.Component {
    home(){
        window.location.href = "/home";
    }

    restart(){
        window.location.reload();
    }

    render() {
        return (
            <Popup open={this.props.lose} position="center" 
                   closeOnDocumentClick={false} closeOnEscape={false} className='popup'>
                <div className='message'>
                    <p>
                        Your hand is full.
                    </p>
                    <p>
                        You lose the game.
                    </p>
                </div>
                <div className='function-buttons'>
                    <button onClick={() => this.home()} className='popup-button'>Home</button>
                    <button onClick={() => this.restart()} className='popup-button'>Restart</button>
                </div>
            </Popup>
        )
    }
}

export default LoseDisplay;