import 'aframe'
import React from 'react'
import AframeNavLink from "./AframeNavLink.js"

class AframeNav extends React.Component{
    formatPosition(x,y,z, positionString){
        // console.log("input format string: ", positionString)
        var positionSplits = positionString.split(" ")
        positionSplits[0] = parseFloat(positionSplits[0]) + x 
        positionSplits[1] = parseFloat(positionSplits[1]) + y
        positionSplits[2] = parseFloat(positionSplits[2]) + z
        // console.log("formatted splits: ", positionSplits)
        var returnString = positionSplits.join(" ")
        // console.log("formatted pos string: ", returnString)
        return returnString
    }
    render(){
        // console.log("aframeNavPos: ", this.props.position)
        return(
            <a-entity class="clickable" position={this.props.position}>
                <AframeNavLink text="Home" position="-3 0 0" width="1"/>
                <AframeNavLink text="Blog" position="-2 0 0" width="1"/>
                <AframeNavLink text="Web Development" position="-0.5 0 0" width="2"/>
                <AframeNavLink text="Product Design" position="1.5 0 0" width="2"/>
                <AframeNavLink text="Ideas" position="3 0 0" width="1"/>
               
            </a-entity>
        )
    }
}
export default AframeNav