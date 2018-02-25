import React from 'react'
import draftToHtml from 'draftjs-to-html'
import ReactHtmlParser from 'react-html-parser';
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import {Redirect} from 'react-router-dom'

const containerStyle = {
    boxShadow: '0px 3px 3px rgba(10, 10, 10, .2)',
    padding: '15px'
}

const aStyle = {
    textDecoration: "none",
}

const postControlStyle = {
    display: "inline-block",
    cursor: 'pointer',
    float: "right",
    margin: "0 2px"
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
                <div className="post-title">
                    <a style={aStyle} href={`/${this.props.type}/${this.props.id}`}>{titleStyle}</a>
                </div>
                {blogDescription}
                {blogBody}
                <div className="row post-user-buttons">
                    <div className="post-button-container">
                        {this.props.buttons.map((button)=>{
                                return(
                                    <div key={button._id} className="post-link-container">
                                        <a  className="post-link" href={button.url}>{` ${button.title}  `}<i className="fa fa-angle-right"></i></a>
                                    </div>
                                )
                            })}
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