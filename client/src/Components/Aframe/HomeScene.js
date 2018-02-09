import 'aframe'
import React from 'react'


class AframeHome extends React.Component{
    render(){
        return(
            <a-scene class="aframe" embedded>
                 <a-text value="Hello" color="#FFAABB" position="0 1 -3"></a-text>
            </a-scene>
        )
    }
}

export default AframeHome

