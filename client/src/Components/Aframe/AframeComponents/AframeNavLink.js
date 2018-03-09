import 'aframe'
import React from 'react'

class AframeNavLink extends React.Component{
    calculateGeometry(){
        return 'primitive:plane; width: ' + this.props.width
    }
    render(){
        return(
            <a-text class="clickable" scale="1 1 1" value={this.props.text} align="center" position={this.props.position} geometry={this.calculateGeometry()} material="color: black; opacity: 0.3">
                    <a-animation
                        attribute="scale"
                        dur="500"
                        to="1.2 1.2 1"
                        begin="mouseenter"
                        end="mouseleave"
                    >
                    </a-animation>
                    <a-animation
                        attribute="scale"
                        dur="500"
                        to="1 1 1"
                        begin="mouseleave"
                    >
                    </a-animation>
            </a-text>
        )
    }
}

export default AframeNavLink