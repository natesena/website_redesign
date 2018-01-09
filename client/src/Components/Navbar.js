import React from 'react'
import {Link} from 'react-router-dom'
import WebDevelopment from './WebDevelopment.js'

class Navbar extends React.Component{
    render(){
        return (
            <div className='NavBar'>
                <Link to='/'>Home</Link>
                <Link to='/WebDevelopment'>WebDevelopment</Link>
                <Link to='/ProductDesign'>Product Design</Link>
                <Link to='/Blog'>Blog</Link>
                <Link to='/Ideas'>Ideas</Link>
            </div>
        )
    }
}

export default Navbar