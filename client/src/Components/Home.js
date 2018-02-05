import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'

class Home extends React.Component{
    state={
        posts: []
    }
    componentDidMount(){
        axios.get('/api/Blog')
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts]
            })
        })
    }
    render(){
        return(
            <div>
                <h1>This is the home</h1>
                <p>I want to have an animation that zooms in on each post in hover</p>
                {this.state.posts.map((post)=>{
                    return <Post key={post._id} id={post._id} title={post.title} description={post.description} bodyVisible={false} controls={false}/>
                })}
            </div>
        )
    }
}

export default Home