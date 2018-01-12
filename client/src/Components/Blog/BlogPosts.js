import React from 'react'

const divStyle = {
    boxShadow: '0px 3px 3px rgba(10, 10, 10, .2)',
    padding: '10px'
}
const postControlStyle = {
    textAlign: 'right'
}

class BlogPost extends React.Component{
    render(){
        return(
            <div style={divStyle}>
            {/* put an href here to the specific post */}
                <a href={`/Blog/${this.props.id}`}><h2>{this.props.title}</h2></a>
                <p>{this.props.description}</p>
                <div style={postControlStyle}>
                    <p>edit</p>
                    <p>trash</p>
                </div>
            </div>
        )
    }
}

export default BlogPost