import React from 'react';
import Popup from 'reactjs-popup';

class WinDisplay extends React.Component{
    render(){
        return (
            <div>
                <Popup open={this.props.win} position="center">
                    <div>Popup content here</div>
                </Popup>
            </div>
        )
    }
}

export default WinDisplay;