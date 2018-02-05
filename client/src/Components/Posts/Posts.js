import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'

const divStyle = {
    boxShadow: '0px 3px 3px rgba(10, 10, 10, .2)',
    padding: '10px'
}

const aStyle = {
    textDecoration: "none",
    margin: "10px"
}
const editStyle = {
    margin: "2px",
    textDecoration: "none"
}
const postControlStyle = {
    textAlign: 'right'
}
const blogBodyStyle = {
    boxShadow: '0px 3px 3px rgba(10, 10, 10, .2)',
    padding: '10px',
    margin: "10px 0"
}
const pStyle ={
    margin: "10px"
}

class Post extends React.Component{
    deletePost(){
        axios.delete('/api/Blog/' + this.props.id)
        .then((res)=>{
            console.log("res: ", res)
        })
    }
    render(){
        let controls = null
        let blogBody = null
        if(this.props.bodyVisible){
            blogBody = <div style={blogBodyStyle}>
            {ReactHtmlParser(draftToHtml(this.props.body))}
            </div>
        }  
        if(this.props.controls){
            controls =  <div style={postControlStyle}>
                            <a style={editStyle} href={`/Edit/${this.props.id}`}>edit</a>
                            <a style={editStyle} href="#trash" onClick={this.deletePost.bind(this)}>Trash</a>
                        </div>
        }

        return(
            <div className="post" style={divStyle}>
            {/* put an href here to the specific post */}
                <a style={aStyle} href={`/${this.props.type}/${this.props.id}`}><h2>{this.props.title}</h2></a>
                <div>
                    {ReactHtmlParser(draftToHtml(this.props.description))}
                </div>
                {blogBody}
                {controls}
            </div>
        )
    }
}

export default Post