import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import './App.css';
// import Navbar from './Components/Navbar.js'
import Home from './Components/Home.js'
import WebDevelopment from './Components/WebDevelopment.js'
import ProductDesign from './Components/ProductDesign.js'
import Upload from './Components/Upload.js'
import Blog from './Components/Blog.js'
import Ideas from './Components/Ideas.js'
import Login from './Components/Login.js'
import Welcome from './Components/Welcome.js'
import AframeHome from './Components/Aframe/HomeScene.js'

const appBodyStyle={
  minHeight: window.innerHeight
}

class App extends Component {

  getID(){
    let url = window.location.href
    var splits = url.split('/')
    var idIndex
    for(let i = 0; i < splits.length; i++){
        if(splits[i] === "Blog" || splits[i] === "WebDevelopment" || splits[i] === "ProductDesign" || splits[i] === "UploadProject" || splits[i] === "Edit" ){
            idIndex = i + 1
        }
    }
    return splits[idIndex]? splits[idIndex]:false
  }
  render() {
    return (
      <div className="App">
        <div style={appBodyStyle} className="App-Body">
          <Switch>
            <Route exact path="/" render={(props)=>{
              return <Welcome/>
            }} />
            <Route exact path="/vr" render={(props)=>{
              return <AframeHome/>
            }} />
            <Route path="/home" render={(props)=>{
              return <Home/>
            }} />
            <Route exact path="/login" render={(props)=>{
              return <Login/>
            }} />
            <Route path="/WebDevelopment" render={(props)=>{
              return <WebDevelopment  getId={this.getID}/>
            }} />
            <Route path="/Ideas" render={(props)=>{
              return <Ideas getId={this.getID}/>
            }} />
            <Route path="/ProductDesign" render={(props)=>{
              return <ProductDesign getId={this.getID}/>
            }} />
            <Route path="/UploadProject" render={(props)=>{
              return <Upload getId={this.getID}/>
            }} />
            <Route path="/Edit" render={(props)=>{
              return <Upload getId={this.getID}/>
            }} />
            <Route path="/Blog" render={(props)=>{
              return <Blog getId={this.getID}/>
            }} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
