import React from 'react'
import axios from 'axios'
// need to feed in the raw data from the editor component into here
import EditorComponent from './Editor.js'
import { convertToRaw, EditorState } from 'draft-js';
import BlogPost from "./Blog/BlogPosts.js"
//potentially add photo uploads here as well

const EditorStyle = {
    marginTop: "10px",
    border: "5px solid black",
    
}

const errorStyle = {
    backgroundColor: "red",
    padding: "5px"
}

const InputStyle = {
    border: "none",
    margin: "20px 0 20px 0",
    border: "1px solid black",

}
const TextAreaStyle = {
    border: "none",
    margin: "5px 0",
    width: "100%",
    border: "1px solid black",
    minHeight: "100px"
}

const SelectStyle = {
    margin: "10px 0 10px 0",
    backgroundColor: "gray",
    fontSize: "1.5em",
    padding: "5px",
    clear: "both"
}


class Upload extends React.Component{
    //must create an empty editor state if going to upload an rich text document with draft.js
    state = {
        errors: [],
        bodyPlaceholder: '',
        title: '',
        titlePlaceholder: 'Name',
        ProjectDescription: '',
        descriptionPlaceholder: 'Project Description',
        type: 'WebDevelopment',
        typePlaceholder: '',
        editorState: EditorState.createEmpty(),
    }
    // THis function will be used to determine if we are editing or not
    componentDidMount(){
        let url = window.location.href
        var splits = url.split('/')
        for(let i = 0; i < splits.length; i++){
            if(splits[i] === "Edit"){
                //send request for id after "edit"
                axios.get('/api/Blog/' + splits[i+1])
                .then((res)=>{
                    console.log("res: ", res)
                    var theType = res.data.Post.type
                    console.log("theType: ", theType)
                    //get index of select whose value equals the type
                    var theSelect = document.getElementById('select')
                    console.log("options: ",theSelect.options)
                    console.log("options length: ", theSelect.options.length)
                    var selectIndex
                    for(let k = 0; k < theSelect.options.length; k++){
                        console.log("value cycle: ", theSelect.options[k].value)
                        if(theSelect.options[k].value === theType){
                            selectIndex = k
                            //we want to set the select current value to that index
                            theSelect.selectedIndex = selectIndex
                            console.log("found select index", selectIndex)
                        }
                    }
                    this.setState({
                        title: res.data.Post.title,
                        titlePlaceholder: res.data.Post.title,
                        ProjectDescription: res.data.Post.description,
                        descriptionPlaceholder: res.data.Post.description,
                    })
                })
            }
        }
        
    }
    onChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
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
        if(this.state.ProjectDescription === ''){
            this.throwFormError("Error: Missing Description")
            return false
        }
        return true
    }
    throwFormError(errorText){
        console.log("adding error: ", errorText)
        this.setState({
            errors: [...this.state.errors, errorText]
        }, ()=>{
            console.log("errors length: ", this.state.errors.length)
        })
    }   
    clearErrors(){
        this.setState({
            errors: []
        })
    }
    // get the JSON object and send it post body
    submit(evt){
        evt.preventDefault()
        //check if a name or description has been given
        if(this.validateForm()){
            this.clearErrors()
            console.log('form validation passed')
            //set bodyJSONData to Content State
            var bodyJSONData = convertToRaw(this.state.editorState.getCurrentContent())
            
            console.log("bodyJSONData: ",bodyJSONData)
            console.log('tried to submit, title: ' + this.state.title + ', description: ' + this.state.ProjectDescription + ',editorState: ' + this.state.editorState)
            //post request and res
            axios.post('/api/Blog', {
                title: this.state.title,
                description: this.state.ProjectDescription,
                type: this.state.type,
                body: bodyJSONData
            })
            .then((res)=>{
                console.log('res: ', res)
                //dependent on success or not, redirect to the new post
            })
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
        return(
            <div>
                {this.state.errors.map((error, num)=>{
                    return <p key="{num}" style={errorStyle}>{error}</p>
                })}
                <h1>Upload Here</h1>
                <div className="row">
                    <div className="column-half">
                        <div>
                            <input style={InputStyle} type='text' name='title' placeholder={this.state.titlePlaceholder} onChange={this.onChange.bind(this)}/>
                        </div>
                        <div>
                            <textarea style={TextAreaStyle} name='ProjectDescription' placeholder={this.state.descriptionPlaceholder} onChange={this.onChange.bind(this)}></textarea>
                        </div>
                    </div>
                    <div className="column-half">
                        <BlogPost title={this.state.title} description={this.state.ProjectDescription} body={{}} bodyVisible={false}/>
                    </div>
                </div>
                <select id="select" style={SelectStyle} onChange={this.onSelectChange.bind(this)}>
                    <option value="" disabled defaultValue>Select Your Post Category</option>
                    <option value="WebDevelopment">Web Development</option>
                    <option value="ProductDesign">Product Design</option>
                    <option value="Blog">Blog</option>
                    <option value="Ideas">Ideas</option>
                </select>
                <div style={EditorStyle}>
                        {editor}
                </div>
                <button onClick={this.submit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default Upload