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
        let title = <div>
                        <h1>Blog</h1>
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
            <div>
                <h1>{this.props.id}</h1>
                {title}
                {this.state.posts.map((post)=>{
                    return <Post key={post._id} format={postFormat} type={post.type} id={post._id} title={post.title} description={JSON.parse(post.description)} body={JSON.parse(post.body)} descriptionVisible={descriptionVisiblity} bodyVisible={bodyVisibility} controls={controlsVisibility}/>
                })}
            </div>
        )
    }
}

export default Blog