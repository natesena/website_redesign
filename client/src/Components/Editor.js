import React from 'react'
import {Editor, EditorState, RichUtils } from 'draft-js'

const EditorStyle = {
    border: '1px solid black'
}

class EditorComponent extends React.Component{
    state = {
        editorState: EditorState.createEmpty()
    }
    onChange = (editorState) => {
        this.setState({
          editorState,
        });
    }
    onBoldClick(evt) {
        evt.preventDefault()
        this.onChange(RichUtils.toggleInlineStyle(
          this.state.editorState,
          'BOLD'
        ));
      }
    render(){
        return(
            
            <div>
                <h1>Editor</h1>
                <button onClick={this.onBoldClick.bind(this)}>Bold Nah</button>
                <div style={EditorStyle}>
                    <Editor 
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}

export default EditorComponent