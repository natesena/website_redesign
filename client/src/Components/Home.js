import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'
import Navbar from "./Navbar.js"
// import ReactPaginate from 'react-paginate';

class Home extends React.Component{
    state={
        posts: [],
        currentFeaturedPostIndex: 0
    }

    componentDidMount(){
        axios.get('/api/Posts')
        .then((res)=>{
            // console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts],
                currentFeaturedPostIndex: 0
            }, ()=>{
                // console.log("should update every 3 secs")
                this.interval = setInterval(()=>{
                    // console.log("interval step")
                    this.changeFeaturedImg()
                }, 8000)
            })
        })
        
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
    hideDeletedPost(){
        //make the display of a particular post none!
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
        // console.log("imgsrc: ", imgSRC)
        return(
            <div>
                <Navbar/>
                <div className="body-container-top">
                        <div style={backgroundImgStyle} className="text-center title-wrapper img-transition">
                            <h1 className="title">THIS IS THE HOME</h1>
                        </div>
                    <div className="body-container-width">
                       
                        {this.state.posts.map((post)=>{
                            return <Post key={post._id} onDelete={this.hideDeletedPost.bind(this)} home={true} format={"many"} type={post.type} id={post._id} title={post.title} buttons={post.buttonLinks} description={JSON.parse(post.description)} bodyVisible={false} descriptionVisible={true} controls={true}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home