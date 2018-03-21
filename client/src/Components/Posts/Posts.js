import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import {Redirect} from 'react-router-dom'

const containerStyle = {
    boxShadow: '3px 3px 3px 1px rgba(10, 10, 10, .2)',
    padding: '25px 25px 15px 25px'
}

const postControlStyle = {
    display: "inline-block",
    cursor: 'pointer',
    float: "right",
    margin: "0 2px"
}

const singleBlogBodyStyle = {
    padding: '10px',
    margin: "10px 0",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "30px"

}
const manyBlogBodyStyle = {
    padding: '10px',
    margin: "10px 0",
}

const fullPageTitleContainerStyle = {
    marginTop: "100px"
}
const manyTitleContainerStyle = {
    marginBottom: "10px"
}

class Post extends React.Component{
    state={
        home: false,
        redirect:false
    }
    componentDidMount(){
        if(this.props.format === "single"){
            // let appBodyEl = document.querySelector(".App-Body")
            let bodyDropEl = document.querySelector(".body-drop")
            let postBodyEl = document.querySelector(".post-body")
            let postButtonsEl = document.querySelector(".post-user-buttons")
            // post-user-buttons
            console.log(postButtonsEl.clientHeight)
            postBodyEl.style.height = (window.innerHeight - (postButtonsEl.clientHeight + bodyDropEl.clientHeight)) + "px"
        }
        //
        this.setState({
            home: this.props.home
        })
    }
    deletePost(){
        console.log("does post know home is: ", this.state.home)
        axios.delete('/api/Posts/' + this.props.id)
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
        let divClass = "full-page-post" //-------------
        let divStyle = null
        let titleContainerStyle = fullPageTitleContainerStyle
        let titleStyle = <h1 className="full-page-post-title">{this.props.title}</h1>
        let controls = null
        let blogBody = null
        let blogBodyStyle = manyBlogBodyStyle
        let blogDescription = null
        let buttons = null
        if(this.props.buttons){
                buttons = this.props.buttons.map((button,index)=>{
                return(
                    <div key={index} className="post-link-container">
                        <a  className="post-link" href={button.url}>{` ${button.title}  `}<i className="fa fa-angle-right"></i></a>
                    </div>
                )
            })
        }
        if(this.props.bodyVisible){
            if(this.props.format === "single"){
                blogBodyStyle = singleBlogBodyStyle
            }
            blogBody = <div style={blogBodyStyle}>
            {ReactHtmlParser(draftToHtml(this.props.body))}
            </div>
        }  
        if(this.props.controls){
            controls =  <div className="inline-block float-right">
                            <div style={postControlStyle}>
                                <a href={`/Edit/${this.props.id}`}><i className="fa fa-edit post-control-button"></i></a>
                            </div>
                            <div style={postControlStyle}>
                                <a href="#trash" onClick={this.deletePost.bind(this)}><i className="fa fa-trash post-control-button"></i></a> 
                            </div>
                        </div>
        }
        if(this.props.descriptionVisible){
            blogDescription = <div>
                                {ReactHtmlParser(draftToHtml(this.props.description))}
                            </div>
        }
        if(this.props.format === "many"){
            //have totally different appearance
            titleContainerStyle = manyTitleContainerStyle
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
                <div className="post-body">
                    <div className="post-title-container" style={titleContainerStyle}>
                        <a className="post-title" href={`/${this.props.type}/${this.props.id}`}>{titleStyle}</a>
                    </div>
                    {blogDescription}
                    {blogBody}
                </div>
                <div className="row post-user-buttons">
                    <div className="post-button-container">
                        {buttons}
                    </div>
                    <div style={postControlStyle}>
                        <i className="fa fa-link post-control-button" onClick={this.copyLink.bind(this)}></i>
                    </div>
                    {controls}
                </div>
                
            </div>
        )
    }
}

export default Post