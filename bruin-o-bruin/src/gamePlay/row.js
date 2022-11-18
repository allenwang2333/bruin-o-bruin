import Block from "./block.js";
import React from 'react';
import "./gamePlay.css"


class Row extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blocks: this.props.row,
        }
    }
    
    render(){
        const row = this.state.blocks;
        return (<div className="row">
                    {row.map((element, index) => <Block block={element} key={index} onClick={(l, r, c) => this.props.onClick(l, r, c)}/>)}
                </div>);
    }
}

export default Row;