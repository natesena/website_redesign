import 'aframe'
import React from 'react'

class AframeNav extends React.Component{
    render(){
        return(
            <a-entity position={this.props.position}>
                <a-text>Home</a-text>
            </a-entity>
        )
    }
}
export default AframeNav