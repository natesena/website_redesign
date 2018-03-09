import "aframe"
import React from "react"

class FeaturedPost extends React.Component{
    render(){
        return(
            <a-entity>
                <a-text value="FEATURED POST" scale="3 3 1"></a-text>
            </a-entity>
        )
    }
}
export default FeaturedPost