import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';

const divStyle = {
    boxShadow: '0px 3px 3px rgba(10, 10, 10, .2)',
    padding: '10px'
}
const postControlStyle = {
    textAlign: 'right'
}
const blogBodyStyle = {
    border: "1px solid blue"
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
            <div style={divStyle}>
            {/* put an href here to the specific post */}
                <a href={`/Blog/${this.props.id}`}><h2>{this.props.title}</h2></a>
                <p>{this.props.description}</p>
                {blogBody}
                <div style={postControlStyle}>
                    <p>edit</p>
                    <p>trash</p>
                </div>
            </div>
        )
    }
}

export default BlogPost