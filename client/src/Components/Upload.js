import React from 'react'
import axios from 'axios'
import EditorComponent from './Editor.js'

class Upload extends React.Component{
    state = {
        title: '',
        ProjectDescription: ''
    }
    onChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    submit(evt){
        evt.preventDefault()
        console.log('tried to submit ' + this.state.title + ', ' + this.state.ProjectDescription)
        axios.post('/api/Blog', {
            title: this.state.title,
            description: this.state.ProjectDescription
        })
        .then((res)=>{
            console.log('res', res)
        })
    }
    render(){
        return(
            <div>
                <h1>Upload Here</h1>
                <form onSubmit={this.submit.bind(this)}>
                    <div>
                        <label>Name</label>
                        <input type='text' name='title' value={this.state.value} onChange={this.onChange.bind(this)}/>
                    </div>
                    <div>
                        <label>Project Description</label>
                        <textarea name='ProjectDescription' value={this.state.value} onChange={this.onChange.bind(this)}></textarea>
                    </div>
                    <br/>
                    <EditorComponent/>
                    <input type='submit' ></input>
                </form>
            </div>
        )
    }
}

export default Upload