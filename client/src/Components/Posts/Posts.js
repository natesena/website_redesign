import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'

const containerStyle = {
    boxShadow: '0px 3px 3px rgba(10, 10, 10, .2)',
    padding: '10px'
}

const aStyle = {
    textDecoration: "none",
    margin: "10px"
}
const editStyle = {
    margin: "2px",
    verticalAlign: "middle"
}
const postControlStyle = {
    textAlign: 'right'
}
const blogBodyStyle = {
    padding: '10px',
    margin: "10px 0"
}


class Post extends React.Component{
    deletePost(){
        axios.delete('/api/Blog/' + this.props.id)
        .then((res)=>{
            console.log("res: ", res)
        })
    }
    render(){
        let divClass = null //-------------
        let divStyle = null
        let titleStyle = <h1>{this.props.title}</h1>
        let controls = null
        let blogBody = null
        let blogDescription = null
        if(this.props.bodyVisible){
            blogBody = <div style={blogBodyStyle}>
            {ReactHtmlParser(draftToHtml(this.props.body))}
            </div>
        }  
        if(this.props.controls){
            controls =  <div style={postControlStyle}>
                            <a style={editStyle} href={`/Edit/${this.props.id}`}><i className="fa fa-edit"></i></a>
                            <a style={editStyle} href="#trash" onClick={this.deletePost.bind(this)}><i className="fa fa-trash"></i></a> 
                        </div>
        }
        if(this.props.descriptionVisible){
            blogDescription = <div>
                                {ReactHtmlParser(draftToHtml(this.props.description))}
                            </div>
        }
        if(this.props.format === "many"){
            //have totally different appearance
            divClass = "post"
            divStyle = containerStyle
            titleStyle = <h2>{this.props.title}</h2>
        }

        return(
            <div className={divClass} style={divStyle}>
                <a style={aStyle} href={`/${this.props.type}/${this.props.id}`}>{titleStyle}</a>
                {blogDescription}
                {blogBody}
                {controls}
            </div>
        )
    }
}

export default Post