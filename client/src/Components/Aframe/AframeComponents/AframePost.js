import 'aframe'
import React from 'react'

class AframePost extends React.Component{
    state={
        color: "yellow"
    }
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
    //format position takes inputs to move things around
    formatPosition(x,y,z, positionString){
        console.log("pos: ", positionString)
        var coordinates = positionString.split(' ')
        coordinates[0] = Number(coordinates[0]) + x
        coordinates[1] = Number(coordinates[1]) + y
        coordinates[2] = Number(coordinates[2]) + z
        console.log("coordinates: ", coordinates)
        return coordinates.join(" ")
    }
    click(){
        console.log("clicked")
        this.setState({
            color: "red"
        })
    }
    onHover(){
        console.log("hovering")
    }
    render(){
        let featuredImage = null
        if(this.props.featuredImage){
            featuredImage = <a-image src={`${this.props.featuredImage}`} width="2" position={this.props.imagePosition} rotation={this.props.rotation}></a-image>
        }
        return(
            <a-entity class="clickable" onClick={this.click.bind(this)}>
                <a-text value={`${this.props.title}`} color="#000000" align="center" width="2" position={this.formatPosition(0, 0.9, 0,this.props.position)} rotation={this.props.rotation}></a-text>
                <a-text value={`${this.props.description}`} color="#000000" align="center" width="2" position={this.formatPosition(0, 0.75, 0,this.props.position)} rotation={this.props.rotation}></a-text>
                {featuredImage}
                <a-plane height="2" width="2" color={this.state.color} position={this.props.position} rotation={this.props.rotation}>
                </a-plane>
                <a-plane height="2" width="2" color={this.state.color} position={this.props.position} rotation={this.reverseRotation(this.props.rotation)}></a-plane>
                {/* <a-animation begin="mouseenter" end="mouseleave" attribute="position" direction="alternate" from={this.props.position} to={this.formatPosition(0, .1, 0, this.props.position)} dur="1500" repeat="indefinite">
                </a-animation> */}
            </a-entity>
        )
    }
}

export default AframePost