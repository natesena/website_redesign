import React from 'react'
import axios from 'axios'

class Blog extends React.Component{
    componentDidMount(){
        axios.get('/api/Blog')
            .then((res)=>{
                console.log(res)
            })
    }
    render(){
        return(
            <h1>Blog</h1>
        )
    }
}

export default Blog