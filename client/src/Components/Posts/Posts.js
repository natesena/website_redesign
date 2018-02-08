import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import {Redirect} from 'react-router-dom'

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
const shareStyle={
    textAlign: 'right'
}
const blogBodyStyle = {
    padding: '10px',
    margin: "10px 0"
}


class Post extends React.Component{
    state={
        home: false,
        redirect:false
    }
    componentDidMount(){
        // console.log("post props: ", this.props)
        
        this.setState({
            home: this.props.home
        })
    }
    deletePost(){
        console.log("does post know home is: ", this.state.home)
        axios.delete('/api/Blog/' + this.props.id)
        .then((res)=>{
            this.setState({
                redirect: true
            })
        })
    }
    copyLink(){
        // let shareLink = `${__dirname}/${this.props.type}/${this.props.id}` 
        // event.clipboardData.setData("text/plain", shareLink);
        console.log("i wish this copied")
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
        if(this.state.redirect){//we will redirect when we have hit delete
            console.log("test state home persistence", this.state.home)
            if(this.state.home){// if the pageis home return home, but really just make post not display....
                return <Redirect to={`/`} />
            }
            return <Redirect to={`/${this.props.type}`} />
        }
        return(
            <div className={divClass} style={divStyle}>
                <a style={aStyle} href={`/${this.props.type}/${this.props.id}`}>{titleStyle}</a>
                {blogDescription}
                {blogBody}
                <div style={shareStyle}>
                    <i onClick={this.copyLink.bind(this)} className="fa fa-link"></i>
                </div>
                {controls}
                <p>Let's include a link button to copy the link :)</p>
            </div>
        )
    }
}

export default Post