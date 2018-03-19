import 'aframe'
import React from 'react'
import AframePost from './AframeComponents/AframePost.js'
import axios from 'axios'
import AframeNav from './AframeComponents/AframeNav.js'
import FeaturedPost from './AframeComponents/FeaturedPost.js'

class AframeHome extends React.Component{
    state={
        posts: [],
        id: null,
        featured: false
    }
    componentDidMount(){
        //if a singular post get one post
            //render differently
        //if a singular category get one category
            //render same
        //if all categories 
            //render same
        let url = window.location.href
        var urlSplits = url.split("/")
        var type = null
        var id = null
        console.log(urlSplits)
        for(let i = 0; i < urlSplits.length; i++){
            if(urlSplits[i] === "vr"){
                if(urlSplits[i + 1]){
                    type = urlSplits[i + 1]
                    if(urlSplits[i + 2]){
                        id = urlSplits[i + 2]
                        this.getOnePost(id)
                    }
                    else{
                        this.getAllTypePosts(type)
                    }
                }
                else{
                    this.getAllPosts()
                }
            }
        }
    }
    getOnePost(id){
        console.log("get one post")
        axios.get('/api/Posts/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post],
                featured: true
            })
        })
    }
    //getAllPosts hits a route to deliver all posts
    getAllTypePosts(type){
        axios.get('/api/Posts/', {params:{type: type}})
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts],
                id: null,
                featured: false
            })
        })
    }
    getAllPosts(){
        axios.get('/api/Posts/', {params:{type: "Blog"}})
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts],
                id: null,
                featured: false
            })
        })
    }
    //if there is an id in the url get one post otherwise all posts
    // componentDidMount(){
        // let id = this.props.getId()
        // // console.log(id)
        // if(id){
        //     this.getOneBlogPost(id)
        // }
        // else{
        //     this.getAllBlogPosts()
        // }
    // }
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
        //each post should have a different rotation in 3d space to face user
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
            <a-scene>
                <AframeNav position="0 3 -7"/>
                <a-sky src="http://blog.topazlabs.com/wp-content/uploads/2013/07/Screen-Shot-2013-12-11-at-10.42.18-AM.png"></a-sky>
                <a-circle color="#CCCCCC" radius="20" position="0 -3 0" rotation="-90 0 0"></a-circle>
                {this.state.posts.map((post, index)=>{
                    if(this.state.posts.length === 1 && this.state.featured){
                        console.log("one post")
                        return <FeaturedPost key={index}/>
                    }
                    return <AframePost 
                                key={post._id} 
                                id={post._id} 
                                click={()=>this.getOnePost(post._id)} 
                                title={post.title} 
                                description={post.aframeDescription} 
                                type={post.type} 
                                featuredImage={this.returnFeaturedImage(post)} 
                                body={post.aframeBody} 
                                index={index} 
                                imagePosition={this.calculatePosition(index, this.state.posts.length, 6.9, 3)} 
                                position={this.calculatePosition(index, this.state.posts.length, 7, 3)} 
                                rotation={this.calculateRotation(index, this.state.posts.length)}/>
                })}
                <a-camera>
                    {/* need an animation end */}
                    <a-entity cursor="fuse: true; fuseTimeout: 1500"
                    position="0 0 -1"
                    geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
                    material="color: black; shader: flat"
                    raycaster="far: 20; objects: .clickable">
                        <a-animation 
                            begin="mouseenter"
                            attribute="scale"
                            end="mouseleave"
                            dur="1500"
                            fill="forwards"
                            from="1.1 1.1 1.1"
                            to="0.4 0.4 0.4"
                            >
                        </a-animation>
                         <a-animation 
                            begin="mouseleave"
                            dur="100"
                            attribute="scale"
                            fill="forwards"
                            to="1 1 1"
                            >
                        </a-animation>
                        <a-animation 
                            begin="mouseleave"
                            attribute="material.color"
                            to="black"
                            >
                        </a-animation>
                        <a-animation 
                            begin="mouseenter"
                            end="mouseleave"
                            attribute="material.color"
                            dur="1500"
                            fill="forwards"
                            from="#F00"
                            to="#000"
                            >
                        </a-animation>
                    </a-entity>
                </a-camera>
            </a-scene>
        )
    }
}

export default AframeHome

