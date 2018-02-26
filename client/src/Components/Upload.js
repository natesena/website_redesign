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




class Upload extends React.Component{
    //must create an empty editor state if going to upload an rich text document with draft.js
    //this.state.emptydescription is to clarify what an empty description looks like for form validation
    state = {
        id: null,
        errors: [],
        emptyDescription: '',
        title: '',
        descriptionEditorState: EditorState.createEmpty(),
        type: 'WebDevelopment',
        editorState: EditorState.createEmpty(),
        buttons: [{title: '', url: ''}],
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
                    editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.Post.body))) 
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
        this.setState({
            buttons: [...this.state.buttons, {title: '', url: ''}]
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
            let postData = {
                title: this.state.title,
                description: JSON.stringify(descriptionJSONData),
                type: this.state.type,
                buttonLinks: this.state.buttons,
                body: JSON.stringify(bodyJSONData)
            }
            let id = this.props.getId()
            console.log("submit id: ", id)
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
                            <Post format={"many"} title={this.state.title} buttons={this.state.buttons} description={convertToRaw(this.state.descriptionEditorState.getCurrentContent())} body={{}} descriptionVisible={true} bodyVisible={false} controls={false}/>
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
                                {this.state.buttons.map((button, index)=>{
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
                                })}
                                <button className="upload-button" onClick={this.addLinkButton.bind(this)}>Add a Link To Post</button>
                                
                            </div>
                            
                            <div style={EditorStyle}>
                                <h2>Post Description</h2>
                                <EditorComponent onChange={this.onDescriptionStateChange.bind(this)} editorState={this.state.descriptionEditorState}/>
                            </div>
                            <div style={EditorStyle}>
                                    <h2>Post Body</h2>
                                    {editor}
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