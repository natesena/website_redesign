import React from 'react'
import {Link} from 'react-router-dom'
import $ from "jquery"
import 'font-awesome/css/font-awesome.min.css'

const LinkStyle = {
    margin: '10px',
    textDecoration: 'none',
    color: 'white',
}
// let navStyle = {
//     backgroundColor: 'black',
//     width: window.innerWidth
// }

class Navbar extends React.Component{
    componentDidMount(){
        // var navEl = document.querySelector(".NavBar")
        // console.log("navEl Width: ", navEl.style.width)
    }
    dropDownMenu(){
        let menuList = document.getElementById('menu-list')
        // console.log("menuList: ",menuList.style)
        if(menuList.style.display === '' || menuList.style.display === 'none'){
            // console.log('sliding down')
            $('.NavList').slideDown()
            // console.log("menuList: ",menuList.style)
        }
        else {
            // console.log('sliding up')
            $('.NavList').slideUp()
            // console.log("menuList: ",menuList.style)
        }
    }
    render(){
       
        // console.log('window href: ', window.location.href)
        // if(window.location.href === window.location.origin + '/'){
        //     navStyle = {
        //         background: "transparent",
        //         // width: window.innerWidth
        //     }
        // }
        return (
            <div className='NavBar' >
                <i className="toggle-nav fa fa-bars" onClick={this.dropDownMenu}></i>
                <ul id="menu-list" className="NavList">
                    <li><Link to='/home' style={LinkStyle}>Home</Link></li>
                    <li><Link to='/WebDevelopment' style={LinkStyle}>Web Development</Link></li>
                    <li><Link to='/ProductDesign' style={LinkStyle}>Product Design</Link></li>
                    <li> <Link to='/Blog' style={LinkStyle}>Blog</Link></li>
                    <li><Link to='/Ideas' style={LinkStyle}>Ideas</Link></li>
                    <li><Link to='/UploadProject' style={LinkStyle}>Upload</Link></li>
                    <li><Link to='/vr' style={LinkStyle}>Try VR</Link></li>
                </ul>
            </div>
            
        )
    }
}

export default Navbar