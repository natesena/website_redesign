import 'aframe'
import React from 'react'

class AframePost extends React.Component{
    //reverseRotation places a second plane in the same spot as the first plane carrying the post
    //this second plane is angled the exact opposite as to make the post visible from both sides
    reverseRotation(rotationString){
        // console.log(`input rotation string ${this.props.index}: `, rotationString)
        var coordinates = rotationString.split(' ')
        coordinates[1] = coordinates[1] - 180
        var returnCoordinates = coordinates.join(' ')
        // console.log(`returnCoordinates ${this.props.index}: `, returnCoordinates)
        return returnCoordinates
    }
    render(){
        return(
            <a-entity>
                <a-text value={`${this.props.index}`} color="#FFAABB" position={this.props.position} rotation={this.props.rotation}></a-text>
                <a-plane height="2" width="2" color="#CCBBAA" position={this.props.position} rotation={this.props.rotation}></a-plane>
                <a-plane height="2" width="2" color="#CCBBAA" position={this.props.position} rotation={this.reverseRotation(this.props.rotation)}></a-plane>
            </a-entity>
        )
    }
}

export default AframePost