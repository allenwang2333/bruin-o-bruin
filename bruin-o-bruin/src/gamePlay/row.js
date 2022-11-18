import Block from "./block.js";
import React from 'react';
import "./gamePlay.css"


class Row extends React.Component{
    render(){
        const row = this.props.row;
        return (<div className="row">
                    {row.map((element, index) => <Block block={element} key={index} onClick={(l, r, c) => this.props.onClick(l, r, c)}/>)}
                </div>);
    }
}

export default Row;