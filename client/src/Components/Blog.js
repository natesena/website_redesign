import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'

class Blog extends React.Component{
    state={
        id: '',//oly used if there is a single post
        posts:[]
    }
    //getOneBlogPost hits a different route to only return one post
    getOneBlogPost(id){
        axios.get('/api/Posts/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post]
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
    render(){
        let postFormat = "many"
        let bodyVisibility = false
        let descriptionVisiblity = true
        let controlsVisibility = false
        let title = <div className="text-center">
                        <h1 className="title">Blog</h1>
                        <p>I want to do pagination on this page and should look up if there is a best practice</p>
                    </div>
        if(this.state.id){
            postFormat = "single"
            bodyVisibility = true
            descriptionVisiblity = false
            controlsVisibility = true
            title = null
        }
        return(
            //dependent on the format of the post make it look differently
            <div className="body-drop">
                <div className="body-container">
                    {title}
                    {this.state.posts.map((post)=>{
                        return <Post key={post._id} buttons={post.buttonLinks} format={postFormat} pageID={this.state.id} type={post.type} id={post._id} title={post.title} description={JSON.parse(post.description)} body={JSON.parse(post.body)} descriptionVisible={descriptionVisiblity} bodyVisible={bodyVisibility} controls={controlsVisibility}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Blog