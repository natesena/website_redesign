import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'

class Blog extends React.Component{
    state={
        id: '',
        posts:[]
    }
    getOneBlogPost(id){
        axios.get('/api/Blog/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post]
            })
        })
    }
    getAllBlogPosts(){
        axios.get('/api/Blog/', {params:{type: "Blog"}})
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts]
            })
        })
    }
    componentDidMount(){
        let id = this.props.id
        console.log(id)
        if(id){
            this.getOneBlogPost(id)
        }
        else{
            this.getAllBlogPosts()
        }
    }
    render(){
        let visibility = false
        let controlsVisibility = false
        if(this.state.id){
            visibility = true
        }
        if(this.props.id){
            controlsVisibility = true
        }
        return(
            <div>
            <h1>Blog</h1>
            <p>I want to do pagination on this page and should look up if there is a best practice</p>
                {this.state.posts.map((post)=>{
                    return <Post key={post._id} id={post._id} title={post.title} description={post.description} body={JSON.parse(post.body)} bodyVisible={visibility} controls={controlsVisibility}/>
                })}
            </div>
        )
    }
}

export default Blog