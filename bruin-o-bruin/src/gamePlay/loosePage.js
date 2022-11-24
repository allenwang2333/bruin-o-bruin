import React from 'react';
import Popup from 'reactjs-popup';

class LooseDisplay extends React.Component{
    render(){
        return (
            <div>
                <Popup open={this.props.loose} position="right center">
                    <div>Popup content here !!</div>
                </Popup>
            </div>
        )
    }
}

export default LooseDisplay;