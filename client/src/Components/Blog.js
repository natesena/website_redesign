import React from 'react'
import axios from 'axios'
import BlogPost from './Blog/BlogPosts.js'

class Blog extends React.Component{
    state={
        posts:[]
    }
    getID(){
        let url = window.location.href
        var splits = url.split('/')
        var idIndex
        for(let i = 0; i < splits.length; i++){
            if(splits[i] === "Blog"){
                idIndex = i + 1
            }
        }
        return splits[idIndex]? splits[idIndex]:false
    }
    getOneBlogPost(id){
        axios.get('/api/Blog/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
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
        let id = this.getID()
        console.log(id)
        if(id){
            this.getOneBlogPost(id)
        }
        else{
            this.getAllBlogPosts()
        }
        
    }
    render(){
        return(
            <div>
            <h1>Blog</h1>
                {this.state.posts.map((post)=>{
                    return <BlogPost key={post._id} id={post._id} title={post.title} description={post.description} />
                })}
            </div>
        )
    }
}

export default Blog