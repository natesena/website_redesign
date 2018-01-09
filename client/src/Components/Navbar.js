import React from 'react'
import {Link} from 'react-router-dom'


const NavBarStyle = {
    backgroundColor: 'black',
    color: 'white',
}

const LinkStyle = {
    margin: '10px',
    padding: '10px'
}

class Navbar extends React.Component{
    render(){
        return (
            <div className='NavBar' style={NavBarStyle}>
                <Link to='/' style={LinkStyle}>Home</Link>
                <Link to='/WebDevelopment' style={LinkStyle}>Web Development</Link>
                <Link to='/ProductDesign' style={LinkStyle}>Product Design</Link>
                <Link to='/Blog' style={LinkStyle}>Blog</Link>
                <Link to='/Ideas' style={LinkStyle}>Ideas</Link>
                <Link to='/UploadProject' style={LinkStyle}>Upload</Link>
            </div>
        )
    }
}

export default Navbar