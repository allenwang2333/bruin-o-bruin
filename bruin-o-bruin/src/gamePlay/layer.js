import {Block} from "./block.js";
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
        for(var i = 0; i < row.length; i++){
            res += <Block block={row[i]} onClick={this.props.onClick()}/>;
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
