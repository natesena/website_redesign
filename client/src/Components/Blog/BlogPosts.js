import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';

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

class BlogPost extends React.Component{
    
    render(){
        let blogBody = null
        if(this.props.bodyVisible){
            blogBody = <div style={blogBodyStyle}>
            {ReactHtmlParser(draftToHtml(this.props.body))}
            </div>
        }  
        return(
            <div className="post" style={divStyle}>
            {/* put an href here to the specific post */}
                <a style={aStyle} href={`/Blog/${this.props.id}`}><h2>{this.props.title}</h2></a>
                <p style={pStyle}>{this.props.description}</p>
                {blogBody}
                <div style={postControlStyle}>
                    <a style={editStyle} href={`/Blog/${this.props.id}`}>edit</a>
                    <a style={editStyle} href="#trash">Trash</a>
                </div>
            </div>
        )
    }
}

export default BlogPost