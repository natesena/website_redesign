import React from 'react'
import axios from 'axios'

const inputStyle = {
    margin: "10px"
}
class Login extends React.Component{
    state = {
        username: "",
        password: ""
    }
    onChange(evt){
        // console.log("name: ", evt.target.name)
        // console.log("value:", evt.target.value)
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }
    submit(){
        console.log("submit state:", this.state)
    }
    render(){
        return(
            <div className="body-drop">
                <div className="body-container">
                    <div className="center text-center">
                        <h1>Login</h1>
                        <h3>If you aren't Nate you are in the wrong place!</h3>
                        <div>
                            <div style={inputStyle}>
                                <input name="username" value={this.state.username} placeholder="username" onChange={this.onChange.bind(this)}></input>
                            </div>
                            <div>
                                <input type="password" name="password" value={this.state.password} placeholder="password" onChange={this.onChange.bind(this)}></input>
                            </div>
                        </div>
                        <button onClick={this.submit.bind(this)}>Submit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login