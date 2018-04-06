// The upload component is a space where I can upload new posts of any variety
// If I visit the upload component with an id of a particular component following
//  "upload" then I want to pull up that information as if I was editing that 
//  post


import React from 'react'
import axios from 'axios'
import EditorComponent from './Editor.js'
import { convertToRaw, EditorState, convertFromRaw} from 'draft-js';
import draftToHtml from 'draftjs-to-html'
// import ReactHtmlParser from 'react-html-parser';
import Post from "./Posts/Posts.js"
import { Redirect } from 'react-router-dom'

const postFormStyle = {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "20px"
}
const EditorStyle = {
    padding: "10px",
    marginTop: "10px",
    border: "none",
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.1)",
    borderRadius: "10px"
}

const errorStyle = {
    backgroundColor: "red",
    padding: "5px"
}

const InputStyle = {
    border: "none",
    padding: "5px",
    borderRadius: "5px",
    margin: "10px 0 10px 0",
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.1)"
}

const SelectStyle = {
    width: "100%",
    margin: "10px 0 10px 0",
    backgroundColor: "white",
    fontSize: "1.5em",
    padding: "5px",
    clear: "both",
    boxShadow: "1px 1px 3px rgba(0,0,0, 0.1)"
}

const textAreaStyle ={
    border: "none",
    width: "100%"
}

const aframeLinkStyle = {
    width: "90%"
}
// const aframeCheckStyle = {
//     width: "10%"
// }




class Upload extends React.Component{
    //must create an empty editor state if going to upload an rich text document with draft.js
    //this.state.emptydescription is to clarify what an empty description looks like for form validation
    state = {
        id: null,
        errors: [],
        emptyDescription: '',
        title: '',
        descriptionEditorState: EditorState.createEmpty(),
        aframeDescription: '',
        type: 'WebDevelopment',
        editorState: EditorState.createEmpty(),
        aframeBody: '',
        buttons: [{title: '', url: ''}],
        aframePhotoLinks: [{url: "", featured: false}],
        redirectToNewPage: false
    }
    // THis function will be used to determine if we are editing an old post or making a new one
    componentDidMount(){
        //if there is an id, we are editing an old post
        let id = this.props.getId()
        if(id){
            axios.get('/api/Posts/' + id)
            .then((res)=>{
                console.log("res: ", res)
                // console.log("res body: ", res.data.Post.body)
                var theType = res.data.Post.type
                //get index of select whose value equals the type
                var theSelect = document.getElementById('select')
                // console.log("options: ",theSelect.options)
                // console.log("options length: ", theSelect.options.length)
                var selectIndex
                for(let k = 0; k < theSelect.options.length; k++){
                    // console.log("value cycle: ", theSelect.options[k].value)
                    if(theSelect.options[k].value === theType){
                        selectIndex = k
                        //we want to set the select current value to that index
                        theSelect.selectedIndex = selectIndex
                        // console.log("found select index", selectIndex)
                    }
                }
                this.setState({
                    id: res.data.Post._id,
                    title: res.data.Post.title,
                    type: res.data.Post.type,
                    buttons: res.data.Post.buttonLinks,
                    descriptionEditorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.Post.description))) ,
                    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.Post.body))),
                    aframeBody: res.data.Post.aframeBody,
                    aframeDescription: res.data.Post.aframeDescription, 
                    aframePhotoLinks: res.data.Post.aframePhotoLinks
                })
            })
        }
        // if no id, then we are editing a new post and I want to check what an 
        //empty posts editor state is like for form validation
        else{
            this.setState({
                emptyDescription: convertToRaw(this.state.descriptionEditorState.getCurrentContent())
            })
        }
    }
    onChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    onDescriptionStateChange(editorState){
        // console.log("description typing")
        this.setState({
            descriptionEditorState: editorState
        })
    }
    onSelectChange(evt){
        this.setState({
            type: evt.target.value
        })
    }
    onEditorStateChange(editorState) {
        this.setState({
          editorState
        })
    }
   
    validateForm(){
        if(this.state.title === ''){
            this.throwFormError("Error: Missing Title")
            return false
        }
        //if the html from the project description is empty
        var descriptionHTML = draftToHtml(convertToRaw(this.state.descriptionEditorState.getCurrentContent()))
        var emptyDescriptionHTML = draftToHtml(this.state.emptyDescription)
        // console.log("description html: ", descriptionHTML)
        // console.log("emptyHTML: ", emptyDescriptionHTML)
        if(descriptionHTML === emptyDescriptionHTML){
            this.throwFormError("Error: Missing Description")
            return false
        }
        // console.log('form validation passed')
        return true
    }
    throwFormError(errorText){
        // console.log("adding error: ", errorText)
        this.setState({
            errors: [...this.state.errors, errorText]
        }, ()=>{
            // console.log("errors length: ", this.state.errors.length)
        })
    }   
    clearErrors(){
        this.setState({
            errors: []
        })
    }
    addLinkButton(){
        // console.log('link button added')
        if(this.state.buttons){
            this.setState({
                buttons: [...this.state.buttons, {title: '', url: ''}]
            })
        }
        else{
            this.setState({
                buttons: [{title: '', url: ''}]
            })
        }
    }
    addAframePhoto(){
        this.setState({
            aframePhotoLinks: [...this.state.aframePhotoLinks, {url:"", featured: false}]
        })
    }
    linkChange(evt, index){
        // console.log("name: ", evt.target.name)
        // console.log("value: ", evt.target.value)
        // console.log("index:", index)
        const buttons = this.state.buttons
        if(evt.target.name === 'title'){
            buttons[index].title = evt.target.value
        }
        else{
            buttons[index].url = evt.target.value
        }
        this.setState({
            buttons: buttons
        })
    //     console.log("linkchange")
    }
    aframeLinkChange(evt, index){
        const links = this.state.aframePhotoLinks
        if(evt.target.name === "aframeURL"){
            links[index].url = evt.target.value
        }
        else{
           console.log(evt.target.name + " is " + evt.target.value)
           let preValue = this.state.aframePhotoLinks[index].featured
           links[index].featured = !preValue
        }
        console.log("links:",links)
        this.setState({
            aframePhotoLinks: links
        },()=>{
            console.log(this.state)
        })
    }

    // get the JSON object and send it post body
    //I would like to send myself an email of the post

    submit(evt){
        evt.preventDefault()
        //check if a name or description has been given
        if(this.validateForm()){
            this.clearErrors()
            //set bodyJSONData to raw JS structure from Content State
            var bodyJSONData = convertToRaw(this.state.editorState.getCurrentContent())
            var descriptionJSONData = convertToRaw(this.state.descriptionEditorState.getCurrentContent())
            alert("remember to email yourself the post for safe keeping")
            //post request and res
            var postLinks = this.state.buttons
            if(this.state.buttons[0].url === ''){
                postLinks = null
            }
            let postData = {
                title: this.state.title,
                description: JSON.stringify(descriptionJSONData),
                type: this.state.type,
                buttonLinks: postLinks,
                body: JSON.stringify(bodyJSONData),
                aframeDescription: this.state.aframeDescription,
                aframeBody: this.state.aframeBody,
                aframePhotoLinks: this.state.aframePhotoLinks
            }
            let id = this.props.getId()
            // console.log("submit id: ", id)
            if(id){
                axios.patch('/api/Posts/' + id, postData)
                .then((res)=>{
                    console.log("res: ", res)
                    if(res.data.updatedPost){
                        this.setState({
                            redirectToNewPage: true
                        })
                    }
                })
            }
            else{
                    axios.post('/api/Posts', postData)
                .then((res)=>{
                    console.log('res: ', res)
                    //dependent on success or not, redirect to the new post
                    if(res.data.newpost){
                        this.setState({
                            id: res.data.newpost._id,
                            redirectToNewPage: true
                        })
                    }
                })
            }
        }
        
    }
    render(){
        //if it is just an idea, we do not need a rich text editor
        //I would like the editor to begin with placeholder text
        let editor = null
        let buttons = null 
        if(this.state.buttons){
            buttons = this.state.buttons.map((button, index)=>{
                return(
                    <div className="row post-button-inputs" key={index} >
                        <div className="column-half ">
                            <input className="zero-margin full-width" index={index} name={"title"} value={this.state.buttons[index].title} placeholder={"title"}onChange={(evt) => this.linkChange(evt, index)}></input>
                        </div>
                        <div className="column-half">
                            <input className="zero-margin full-width" index={index} name={"url"} value={this.state.buttons[index].url} placeholder={"link url"}onChange={(evt) => this.linkChange(evt, index)}></input>
                        </div>
                    </div>
                )
            })
        }
        if(this.state.type !== 'Ideas'){
            editor = <EditorComponent
                     onChange={this.onEditorStateChange.bind(this)} editorState={this.state.editorState}/>
        }
        if(this.state.redirectToNewPage){
            let redirectLink = `/${this.state.type}/${this.state.id}`
            return <Redirect to={redirectLink} />
        }
        else{   
            return(
                <div className="body-drop">
                    <div className="body-container">
                        {this.state.errors.map((error, num)=>{
                            return <p key="{num}" style={errorStyle}>{error}</p>
                        })}
                        <div className="text-center">
                            <h1 className="title">Upload Here</h1>
                        </div>
                        <div>
                            <h3>Post Preview</h3>
                            <Post format={"many"} title={this.state.title} buttons={this.state.buttons} aframePhotoLinks={this.state.aframePhotoLinks} description={convertToRaw(this.state.descriptionEditorState.getCurrentContent())} body={{}} descriptionVisible={true} bodyVisible={false} controls={false}/>
                        </div>
                        <div style={postFormStyle}>
                            <div >
                                <h3>Title</h3>
                                <div className="center">
                                    <input className="name-input" style={InputStyle} type='text' name='title' value={this.state.title} placeholder={"Name this post"} onChange={this.onChange.bind(this)}/>
                                </div>
                                <h3>Post Category</h3>
                                <div className="center">
                                    <select id="select" style={SelectStyle} onChange={this.onSelectChange.bind(this)}>
                                        <option value="" disabled defaultValue>Select Your Post Category</option>
                                        <option value="WebDevelopment">Web Development</option>
                                        <option value="ProductDesign">Product Design</option>
                                        <option value="Blog">Blog</option>
                                        <option value="Ideas">Ideas</option>
                                    </select>
                                </div>
                                {buttons}
                                <button className="upload-button" onClick={this.addLinkButton.bind(this)}>Add a Link To Post</button>
                                
                            </div>
                            
                            <div style={EditorStyle}>
                                <h2>Post Description</h2>
                                <EditorComponent onChange={this.onDescriptionStateChange.bind(this)} editorState={this.state.descriptionEditorState}/>
                            </div>
                            <div style={EditorStyle}>
                                <h2>Aframe Description</h2>
                                <textarea style={textAreaStyle} name="aframeDescription" value={this.state.aframeDescription} onChange={this.onChange.bind(this)}placeholder="Aframe Description Here"></textarea>
                            </div>
                            <div style={EditorStyle}>
                                    <h2>Post Body</h2>
                                    {editor}
                            </div>
                            <div style={EditorStyle}>
                            <h2>Aframe Body</h2>
                                <textarea style={textAreaStyle} name="aframeBody" value={this.state.aframeBody} onChange={this.onChange.bind(this)} placeholder="Aframe Body Here"></textarea>
                            </div>
                            <div>
                                <h2>Aframe Photo Links</h2>
                            {this.state.aframePhotoLinks.map((link, index)=>{
                                return(
                                    <div key={`aframePhotoLink-${index}`}>
                                        <input name="aframeURL" style={aframeLinkStyle} value={this.state.aframePhotoLinks[index].url} placeholder="url" onChange={(evt)=>{this.aframeLinkChange(evt,index)}}></input>
                                        <input name="aframeCheckBox" type="checkbox" value={this.state.aframePhotoLinks[index].featured} checked={this.state.aframePhotoLinks[index].featured} onChange={(evt)=>{this.aframeLinkChange(evt,index)}}></input>
                                    </div>
                                )
                            })}
                            </div> 
                            <div>
                                <button className="upload-button" onClick={this.addAframePhoto.bind(this)}>Add Aframe Photo</button>
                            </div> 
                            <div className="text-center">
                                <button className="upload-button" onClick={this.submit.bind(this)}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        
    }
}

export default Upload