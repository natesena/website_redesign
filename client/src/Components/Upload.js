import React from 'react'
import axios from 'axios'
// need to feed in the raw data from the editor component into here
import EditorComponent from './Editor.js'
import { EditorState } from 'draft-js';
//potentially add photo uploads here as well

const EditorStyle = {
    border: "5px solid black"
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
    state = {
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
    // get the JSON object and send it post body
    submit(evt){
        evt.preventDefault()
        var bodyJSONData = this.state.editorState.getCurrentContent()
        console.log("bodyJSONData: ",bodyJSONData)
        console.log('tried to submit ' + this.state.title + ', ' + this.state.ProjectDescription + ', ' + this.state.editorState)
        axios.post('/api/Blog', {
            title: this.state.title,
            description: this.state.ProjectDescription,
            type: this.state.type,
            body: bodyJSONData
        })
        .then((res)=>{
            console.log('res', res)
        })
    }
    render(){
        let editor = null
        if(this.state.type !== 'Ideas'){
            editor = <EditorComponent
                    style={EditorStyle} onChange={this.onEditorStateChange.bind(this)} editorState={this.state.editorState}/>
        }
        return(
            <div>
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
                    {editor}
                    <input type='submit' ></input>
                </form>
            </div>
        )
    }
}

export default Upload