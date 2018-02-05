import React from 'react'
import Post from './Posts/Posts.js'
import axios from 'axios'

class Ideas extends React.Component{
    state={
        id: '',
        posts:[]
    }
    getOneIdeaPost(id){
        axios.get('/api/Blog/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post]
            })
        })
    }
    getAllIdeaPosts(){
        axios.get('/api/Blog/', {params:{type: "Idea"}})
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
            this.getOneIdeaPost(id)
        }
        else{
            this.getAllIdeaPosts()
        }
    }
    render(){
        let visibility = false
        if(this.state.id){
            visibility = true
        }
        return(
            <div>
            <h1>Ideas</h1>
            <p>I want to do pagination on this page and should look up if there is a best practice</p>
                {this.state.posts.map((post)=>{
                    return <Post key={post._id} id={post._id} title={post.title} description={JSON.parse(post.description)} body={JSON.parse(post.body)} bodyVisible={visibility}/>
                })}
            </div>
        )
    }
}

export default Ideas