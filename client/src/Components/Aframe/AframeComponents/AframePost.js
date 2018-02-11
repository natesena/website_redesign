import 'aframe'
import React from 'react'

class AframePost extends React.Component{
    reverseRotation(rotationString){
        var coordinates = rotationString.split(' ')
        if(coordinates[1] === '0'){
            return coordinates.join(' ')
        }
        coordinates[1] = "-" + coordinates[1]
        var returnCoordinates = coordinates.join(' ')
        console.log("returnCoordinates: ", returnCoordinates)
        return returnCoordinates
    }
    render(){
        return(
            <a-entity>
                <a-plane height="2" width="2" color="#CCBBAA"position={this.props.position} rotation={this.props.rotation}></a-plane>
                <a-plane height="2" width="2" color="#CCBBAA"position={this.props.position} rotation={this.reverseRotation(this.props.rotation)}></a-plane>
            </a-entity>
        )
    }
}

export default AframePost