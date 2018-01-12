import React from 'react'
import axios from 'axios'
import BlogPost from './Blog/BlogPosts.js'

class Edit extends React.Component{
    state = {
        posts: []
    }
    componentDidMount(){
        // this is for a specific post
        axios.get(`/api/Blog/${this.props.id}`)
        .then((res)=>{
            console.log(res)
            this.setState({posts: [res.data.BlogPost]})
        })
    }
    render(){
        return(
            <div>
                <h1>Edit</h1>
                <p>inherit your stuff here</p>
                {this.state.posts.map((post)=>{
                    return <BlogPost key={post._id} id={post._id} title={post.title} description={post.description}/>
                })}
            </div>
        )
    }
}

export default Edit