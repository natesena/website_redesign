import React from 'react'
import { Editor } from 'react-draft-wysiwyg';
import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class EditorComponent extends React.Component{
    
    render(){
        return( 
            <Editor
                editorState={this.props.editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={this.props.onChange}
            />
        )
    }
}

export default EditorComponent