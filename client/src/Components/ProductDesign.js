import React from 'react'
import BlogPost from './Blog/BlogPosts.js'
import axios from 'axios'

class ProductDesign extends React.Component{
    state={
        id: '',
        posts:[]
    }
    getOneProductDesignPost(id){
        axios.get('/api/Blog/' + id)
        .then((res)=>{
            console.log("res: ", res)
            this.setState({
                id: id,
                posts: [res.data.Post]
            })
        })
    }
    getAllProductDesignPosts(){
        axios.get('/api/Blog/', {params:{type: "ProductDesign"}})
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
            this.getOneProductDesignPost(id)
        }
        else{
            this.getAllProductDesignPosts()
        }
    }
    render(){
        let visibility = false
        if(this.state.id){
            visibility = true
        }
        return(
            <div>
            <h1>Product Design</h1>
            <p>I want to do pagination on this page and should look up if there is a best practice</p>
                {this.state.posts.map((post)=>{
                    return <BlogPost key={post._id} id={post._id} title={post.title} description={post.description} body={JSON.parse(post.body)} bodyVisible={visibility}/>
                })}
            </div>
        )
    }
}

export default ProductDesign