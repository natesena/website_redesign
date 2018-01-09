import React, { Component } from 'react';
import logo from './logo.svg';
import { Switch, Route, Redirect } from 'react-router-dom'
import './App.css';
import Navbar from './Components/Navbar.js'
import Home from './Components/Home.js'
import WebDevelopment from './Components/WebDevelopment.js'
import ProductDesign from './Components/ProductDesign.js'



class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Navbar></Navbar>
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
        </Switch>
      </div>
    );
  }
}

export default App;
