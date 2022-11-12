import Block from "./block.js";
import React from 'react';

class Layer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            blocks: this.props.layer,
        }
    }

    renderRow(i){
        var res = null;
        var row = this.state.blocks[i];
        for(var j = 0; i < row.length; j++){
            res += <Block block={row[j]} onClick={() => this.props.onClick(i, j)}/>;
        }
        return res;
    }
    
    render(){
        var res = null;
        var layer = this.state.blocks;
        for(var i = 0; i < layer.length; i++){
            res +=  <div className="layerRow">
                        {this.renderRow(i)}
                    </div>
        }
        return {res};
    }
}

export default Layer;