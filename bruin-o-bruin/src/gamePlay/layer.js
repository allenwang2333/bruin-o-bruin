import Row from "./row.js";
import React from 'react';
import "./gamePlay.css"

class Layer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blocks: this.props.layer,
        }
    }

    render(){
        const layer = this.state.blocks;
        return (<div className="layer">
                    {layer.map((row, index) => (<Row row={row} key={index} onClick={(l, r, c) => this.props.onClick(l, r, c)}/>))}
                </div>);
    }
}

export default Layer;