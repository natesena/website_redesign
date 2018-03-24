import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'
import NavBar from './Navbar'

class Blog extends React.Component{
    state={
        id: '',//only used if there is a single post
        posts:[],
        currentFeaturedPostIndex: 0
    }
    //getOneBlogPost hits a different route to only return one post
    getOneBlogPost(id){
        axios.get('/api/Posts/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post]
            },()=>{
                // console.log("should update every 3 secs")
                this.interval = setInterval(()=>{
                    // console.log("interval step")
                    this.changeFeaturedImg()
                }, 8000)
            })
        })
    }
    //getAllPosts hits a route to deliver all posts
    getAllBlogPosts(){
        axios.get('/api/Posts/', {params:{type: "Blog"}})
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts]
            }, ()=>{
                // console.log("should update every 3 secs")
                this.interval = setInterval(()=>{
                    // console.log("interval step")
                    this.changeFeaturedImg()
                }, 8000)
            })
        })
    }
    //if there is an id in the url get one post otherwise all posts
    componentDidMount(){
        let id = this.props.getId()
        // console.log(id)
        if(id){
            this.getOneBlogPost(id)
        }
        else{
            this.getAllBlogPosts()
        }
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }
    changeFeaturedImg(){
        // console.log("tried to change featured img")
        var newIndex = 0
        if(this.state.currentFeaturedPostIndex === this.state.posts.length - 1){
            // console.log("should loop to first image")
            this.setState({
                currentFeaturedPostIndex: newIndex
            })
        }
        else{
            // console.log("changing to next img")
            this.setState({
                currentFeaturedPostIndex: this.state.currentFeaturedPostIndex + 1
            })
        }
    }
    returnFeaturedImgURL(index){
        // console.log("tried to update featured img")
        if(this.state.posts.length > 0){
            for(let i = 0; i < this.state.posts[index].aframePhotoLinks.length; i++){
                if(this.state.posts[index].aframePhotoLinks[i].featured === true){
                    var featuredImgSRC = this.state.posts[index].aframePhotoLinks[i].url
                    // console.log("featured img found: ", featuredImgSRC)
                    return featuredImgSRC
                }
            }
        }
        // console.log("no featured image for the post was found")
        return null
    }
    render(){
        var imgSRC = this.returnFeaturedImgURL(this.state.currentFeaturedPostIndex)
        var backgroundImgStyle = null
        if(imgSRC){
            backgroundImgStyle = {backgroundImage: `url(${imgSRC})`}
        }


        let postFormat = "many"
        let bodyVisibility = false
        let descriptionVisiblity = true
        let controlsVisibility = false
        let title =  <div style={backgroundImgStyle} className="text-center title-wrapper img-transition">
                        <div>
                            <h1 className="title">THIS IS THE BLOG</h1>
                        </div>
                    </div>
        if(this.state.id){
            postFormat = "single"
            bodyVisibility = true
            descriptionVisiblity = false
            controlsVisibility = true
            // title = null
        }
        return(
            //dependent on the format of the post make it look differently
            <div>
                <NavBar />
                
                <div className="body-container-top">
                    {title} 
                    <div className="body-container-width"> 
                        {this.state.posts.map((post)=>{
                            return <Post key={post._id} buttons={post.buttonLinks} format={postFormat} pageID={this.state.id} type={post.type} id={post._id} title={post.title} description={JSON.parse(post.description)} body={JSON.parse(post.body)} descriptionVisible={descriptionVisiblity} bodyVisible={bodyVisibility} controls={controlsVisibility}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Blog