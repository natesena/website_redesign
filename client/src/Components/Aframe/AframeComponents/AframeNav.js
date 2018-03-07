import 'aframe'
import React from 'react'

class AframeNav extends React.Component{
    formatPosition(x,y,z, positionString){
        console.log("input format string: ", positionString)
        var positionSplits = positionString.split(" ")
        positionSplits[0] = parseFloat(positionSplits[0]) + x 
        positionSplits[1] = parseFloat(positionSplits[1]) + y
        positionSplits[2] = parseFloat(positionSplits[2]) + z
        console.log("formatted splits: ", positionSplits)
        var returnString = positionSplits.join(" ")
        console.log("formatted pos string: ", returnString)
        return returnString
    }
    render(){
        console.log("aframeNavPos: ", this.props.position)
        return(
            <a-entity class="clickable" position={this.props.position}>
                <a-text class="clickable" value="Home" align="center" position="-3 0 0" geometry="primitive:plane"></a-text>
                <a-text class="clickable" value="Blog" align="center" position="-2 0 0" geometry="primitive:plane"></a-text>
                <a-text class="clickable" value="Web Development" align="center" position="-0.5 0 0" geometry="primitive:plane"></a-text>
                <a-text class="clickable" value="Product Design" align="center" position="1.5 0 0" geometry="primitive:plane"></a-text>
                <a-text class="clickable" value="Ideas" align="center" position="3 0 0" geometry="primitive:plane"></a-text>
            </a-entity>
        )
    }
}
export default AframeNav