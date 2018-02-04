import React from 'react'
import axios from 'axios'
// need to feed in the raw data from the editor component into here
import EditorComponent from './Editor.js'
import { convertToRaw, EditorState } from 'draft-js';
//potentially add photo uploads here as well

const EditorStyle = {
    border: "5px solid black"
}

const errorStyle = {
    backgroundColor: "red",
    padding: "5px"
}

const InputStyle = {
    border: "none",
    margin: "20px 0 20px 0",

}
const TextAreaStyle = {
    border: "none",
    margin: "20px 0 10px 0"
}

const SelectStyle = {
    margin: "10px 0 10px 0",
    backgroundColor: "gray",
    fontSize: "1.5em",
    padding: "5px"
}


class Upload extends React.Component{
    //must create an empty editor state if going to upload an rich text document with draft.js
    state = {
        errors: [],
        title: '',
        ProjectDescription: '',
        type: 'WebDevelopment',
        editorState: EditorState.createEmpty(),
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
                <form onSubmit={this.submit.bind(this)}>
                    <div>
                        <input style={InputStyle} type='text' name='title' placeholder="Name" value={this.state.value} onChange={this.onChange.bind(this)}/>
                    </div>
                    <div>
                        <textarea style={TextAreaStyle} name='ProjectDescription' placeholder="Project Description" value={this.state.value} onChange={this.onChange.bind(this)}></textarea>
                    </div>

                    <select style={SelectStyle} onChange={this.onSelectChange.bind(this)}>
                        <option value="WebDevelopment">Web Development</option>
                        <option value="ProductDesign">Product Design</option>
                        <option value="Blog">Blog</option>
                        <option value="Ideas">Ideas</option>
                    </select>
                    <br/>
                    <div style={EditorStyle}>
                        {editor}
                    </div>
                    <input type='submit' ></input>
                </form>
            </div>
        )
    }
}

export default Upload