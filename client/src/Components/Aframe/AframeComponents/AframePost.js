import 'aframe'
import React from 'react'
import {Redirect} from 'react-router-dom'

class AframePost extends React.Component{
    state={
        color: "#FF0000",
        redirect: false
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
        // console.log("pos: ", positionString)
        var coordinates = positionString.split(' ')
        coordinates[0] = Number(coordinates[0]) + x
        coordinates[1] = Number(coordinates[1]) + y
        coordinates[2] = Number(coordinates[2]) + z
        // console.log("coordinates: ", coordinates)
        return coordinates.join(" ")
    }
    onHover(){
        console.log("hovering")
    }
    render(){
        let featuredImage = null
        if(this.props.featuredImage){
            featuredImage = <a-image src={`${this.props.featuredImage}`} width="2" position={this.props.imagePosition} rotation={this.props.rotation}></a-image>
        }
        if(this.state.redirect){
            return <Redirect to={`/vr/${this.props.type}/${this.props.id}`}/>
        }
        return(
            <a-entity class="clickable" onClick={()=>{
                console.log("sending in post")
                this.props.click()}} geometry="primitive:plane; width: 2">
                <a-text value={`${this.props.title}`} color="#FFFFFF" align="center" scale="3 3 1" width="2" position={this.formatPosition(0, 0.75, 0,this.props.position)} rotation={this.props.rotation}></a-text>
                {/* <a-text value={`${this.props.description}`} color="#FFFFFF" align="center" width="2" position={this.formatPosition(0, 0.75, 0,this.props.position)} rotation={this.props.rotation}></a-text> */}
                {featuredImage}
                <a-plane height="2" width="2" color="#000000" opacity="0.2" position={this.props.position} rotation={this.props.rotation}></a-plane>
                <a-plane height="2" width="2" color="#000000" opacity="0.2" position={this.props.position} rotation={this.reverseRotation(this.props.rotation)}></a-plane>
                    <a-animation 
                        begin="mouseenter" 
                        end="mouseleave" 
                        attribute="position" 
                        direction="alternate" 
                        from="0 0 0" 
                        to="0 0.1 0" 
                        dur="1500" 
                        repeat="indefinite">
                    </a-animation>
                    <a-animation 
                        begin="mouseenter" 
                        end="mouseleave" 
                        attribute="scale" 
                        from="1 1 1" 
                        to="1.1 1.1 1" 
                        dur="500" 
                    >
                    </a-animation>
                    <a-animation 
                        begin="mouseleave" 
                        attribute="scale" 
                        to="1 1 1" 
                    >
                    </a-animation>
                    <a-animation 
                        begin="mouseleave" 
                        end="mouseleave" 
                        attribute="position" 
                        to="0 0 0" 
                        >
                    </a-animation>
            </a-entity>
        )
    }
}

export default AframePost