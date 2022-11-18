import Row from "./row.js";
import React from 'react';
import "./gamePlay.css"

class Layer extends React.Component{
    render(){
        const layer = this.props.layer;
        const style = {zIndex: this.props.zIndex,}
        return (<div className="layer" style={style}>
                    {layer.map((row, index) => (<Row row={row} key={index} onClick={(l, r, c) => this.props.onClick(l, r, c)}/>))}
                </div>);
    }
}

export default Layer;