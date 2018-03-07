import React from 'react'
import axios from 'axios'
import Post from './Posts/Posts.js'
import Navbar from "./Navbar.js"
// import ReactPaginate from 'react-paginate';

class Home extends React.Component{
    state={
        posts: []
    }
    componentDidMount(){
        axios.get('/api/Posts')
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
                <Navbar/>
                <div className="body-container">
                    <div className="text-center title-wrapper">
                        <h1 className="title">THIS IS THE HOME</h1>
                    </div>
                    {this.state.posts.map((post)=>{
                        return <Post key={post._id} onDelete={this.hideDeletedPost.bind(this)} home={true} format={"many"} type={post.type} id={post._id} title={post.title} buttons={post.buttonLinks} description={JSON.parse(post.description)} bodyVisible={false} descriptionVisible={true} controls={true}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Home