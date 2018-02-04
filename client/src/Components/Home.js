import React from 'react'
import axios from 'axios'
import BlogPost from './Blog/BlogPosts.js'

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
                {this.state.posts.map((post)=>{
                    return <BlogPost key={post._id} id={post._id} title={post.title} description={post.description} bodyVisible={false}/>
                })}
            </div>
        )
    }
}

export default Home