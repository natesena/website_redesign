import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'
class WebDevelopment extends React.Component{
    state={
        id: '',
        posts:[]
    }
    getOneWebDevelopmentPost(id){
        axios.get('/api/Blog/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post]
            })
        })
    }
    getAllWebDevelopmentPosts(){
        axios.get('/api/Blog/', {params:{type: "WebDevelopment"}})
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts]
            })
        })
    }
    componentDidMount(){
        let id = this.props.id
        if(id){
            this.getOneWebDevelopmentPost(id)
        }
        else{
            this.getAllWebDevelopmentPosts()
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
            <h1>Web Dev</h1>
            <p>I want to do pagination on this page and should look up if there is a best practice</p>
                {this.state.posts.map((post)=>{
                    return <Post key={post._id} type={post.type} id={post._id} title={post.title} description={JSON.parse(post.description)} body={JSON.parse(post.body)} bodyVisible={visibility} controls={controlsVisibility}/>
                })}
            </div>
        )
    }
}

export default WebDevelopment