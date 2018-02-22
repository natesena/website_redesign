import 'aframe'
import React from 'react'
import AframePost from './AframeComponents/AframePost.js'


class AframeHome extends React.Component{
    state={

    }
    //calculatePosition returns the location of where an aframe post should be.
    calculatePosition(index, length, rad, wid){
        console.log('calc pos: ', index, length, rad, wid)
        var angleBetweenPosts = 360/length
        angleBetweenPosts = (Math.PI/180) * angleBetweenPosts
        //calculate equidistance given that radius
        var xCoordinate = rad * Math.sin(index*angleBetweenPosts)
        var zCoordinate = -(rad * Math.cos(index*angleBetweenPosts))
        //if not enough room between posts, increase the radius
        var coordinates = `${xCoordinate} 1 ${zCoordinate}`
        console.log(`coordinates of ${index}: `,coordinates)
        return coordinates 
    }
    calculateRotation(index,length){
        var yAxisRotation = (360/length) * index
        console.log(`homescene calculated rotation of ${index}: `, yAxisRotation)
        return `0 ${-yAxisRotation} 0`
    }
    render(){
        return(
            <a-scene embedded>
                <a-sky src="http://blog.topazlabs.com/wp-content/uploads/2013/07/Screen-Shot-2013-12-11-at-10.42.18-AM.png"></a-sky>
                <a-circle color="#CCC" radius="20" position="0 -3 0" rotation="-90 0 0"></a-circle>
                {this.props.posts.map((post, index)=>{
                    return <AframePost key={post._id} title={post.title} index={index} position={this.calculatePosition(index, this.props.posts.length, 7, 3)} rotation={this.calculateRotation(index, this.props.posts.length)}/>
                })}
            </a-scene>
        )
    }
}

export default AframeHome

