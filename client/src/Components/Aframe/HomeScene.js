import 'aframe'
import React from 'react'
import AframePost from './AframeComponents/AframePost.js'


class AframeHome extends React.Component{
    state={

    }
    //calculatePosition returns the location of where an aframe post should be.
    calculatePosition(index, length, rad, wid){
        // console.log('calc pos: ', index, length, rad, wid)
        var angleBetweenPosts = 360/length
        angleBetweenPosts = (Math.PI/180) * angleBetweenPosts
        //calculate equidistance given that radius
        var xCoordinate = rad * Math.sin(index*angleBetweenPosts)
        var zCoordinate = -(rad * Math.cos(index*angleBetweenPosts))
        //if not enough room between posts, increase the radius
        var coordinates = `${xCoordinate} 1 ${zCoordinate}`
        // console.log(`coordinates of ${index}: `,coordinates)
        return coordinates 
    }
    calculateRotation(index,length){
        var yAxisRotation = (360/length) * index
        // console.log(`homescene calculated rotation of ${index}: `, yAxisRotation)
        return `0 ${-yAxisRotation} 0`
    }
    returnFeaturedImage(post){
        // console.log(post.aframePhotoLinks)
        for(let i = 0; i < post.aframePhotoLinks.length; i++){
            if(post.aframePhotoLinks[i].featured){
                // console.log("featured img: ", post.aframePhotoLinks[i].url)
                return post.aframePhotoLinks[i].url
            }
        }
        // console.log("no featured img")
            return false
    }
    render(){
        return(
            <a-scene embedded>
                <a-sky src="http://blog.topazlabs.com/wp-content/uploads/2013/07/Screen-Shot-2013-12-11-at-10.42.18-AM.png"></a-sky>
                <a-circle color="#CCC" radius="20" position="0 -3 0" rotation="-90 0 0"></a-circle>
                {this.props.posts.map((post, index)=>{
                    return <AframePost key={post._id} title={post.title} description={post.aframeDescription} featuredImage={this.returnFeaturedImage(post)} body={post.aframeBody} index={index} imagePosition={this.calculatePosition(index, this.props.posts.length, 6.9, 3)} position={this.calculatePosition(index, this.props.posts.length, 7, 3)} rotation={this.calculateRotation(index, this.props.posts.length)}/>
                })}
                <a-camera>
                    {/* need an animation end */}
                    <a-cursor>
                        <a-animation 
                            begin="click"
                            attribute="scale"
                            dur="500"
                            fill="forwards"
                            from="1.1 1.1 1.1"
                            to="0.2 0.2 0.2"
                            >
                        </a-animation>
                        <a-animation 
                            begin="click"
                            attribute="color"
                            dur="500"
                            fill="forwards"
                            from="#F00"
                            to="#000"
                            >
                        </a-animation>
                    </a-cursor>
                </a-camera>
            </a-scene>
        )
    }
}

export default AframeHome

