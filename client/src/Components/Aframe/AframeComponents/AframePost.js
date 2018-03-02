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
    formatPosition(x,y,z, positionString){
        // console.log("pos: ", positionString)
        var coordinates = positionString.split(' ')
        coordinates[0] = Number(coordinates[0]) + x
        coordinates[1] = Number(coordinates[1]) + y
        coordinates[2] = Number(coordinates[2]) + z
        // console.log("coordinates: ", coordinates)
        return coordinates.join(" ")
    }
    render(){
        let featuredImage = null
        if(this.props.featuredImage){
            featuredImage = <a-image src={`${this.props.featuredImage}`} width="2" position={this.props.position} rotation={this.props.rotation}></a-image>
        }
        return(
            <a-entity>
                <a-text value={`${this.props.title}`} color="#000000" align="center" width="2" position={this.formatPosition(0, 0.9, 0,this.props.position)} rotation={this.props.rotation}></a-text>
                <a-text value={`${this.props.description}`} color="#000000" align="center" width="2" position={this.formatPosition(0, 0.75, 0,this.props.position)} rotation={this.props.rotation}></a-text>
                {featuredImage}
                <a-plane height="2" width="2" color="#CCBBAA" position={this.props.position} rotation={this.props.rotation}></a-plane>
                <a-plane height="2" width="2" color="#CCBBAA" position={this.props.position} rotation={this.reverseRotation(this.props.rotation)}></a-plane>
            </a-entity>
        )
    }
}

export default AframePost