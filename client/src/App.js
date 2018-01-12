import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar.js'
import Home from './Components/Home.js'
import WebDevelopment from './Components/WebDevelopment.js'
import ProductDesign from './Components/ProductDesign.js'
import Upload from './Components/Upload.js'
import Blog from './Components/Blog.js'

const containerStyle = {
  margin: '50px'
}

class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Navbar/>
        <div style={containerStyle}>
          <Switch>
            <Route exact path="/" render={(props)=>{
              return <Home/>
            }} />
            <Route path="/WebDevelopment" render={(props)=>{
              return <WebDevelopment/>
            }} />
            <Route path="/ProductDesign" render={(props)=>{
              return <ProductDesign/>
            }} />
            <Route path="/UploadProject" render={(props)=>{
              return <Upload/>
            }} />
            <Route path="/Blog" render={(props)=>{
              return <Blog/>
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
