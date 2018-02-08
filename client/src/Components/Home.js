import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'
// import ReactPaginate from 'react-paginate';

class Home extends React.Component{
    state={
        posts: []
    }
    componentDidMount(){
        axios.get('/api/Blog')
        .then((res)=>{
            // console.log("res: ", res)
            this.setState({
                posts: [...res.data.Posts]
            })
        })
    }
    hideDeletedPost(){
        //make the display of a particular post none!
    }
    render(){
        return(
            <div>
                <h1>This is the home</h1>
                <p>I want to have an animation that zooms in on each post in hover</p>
                {this.state.posts.map((post)=>{
                    return <Post key={post._id} onDelete={this.hideDeletedPost.bind(this)} home={true} format={"many"} type={post.type} id={post._id} title={post.title} description={JSON.parse(post.description)} bodyVisible={false} descriptionVisible={true} controls={true}/>
                })}
            </div>
        )
    }
}

export default Home