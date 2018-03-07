import React from 'react'

class Welcome extends React.Component{
    render(){
        return(
            <div className="body-container text-center">
                <h1>Welcome</h1>
                <p><a href="/vr">VR</a></p>
                <p>or</p>
                <p><a href="/home">2D</a></p>
            </div>
        )
    }
}
export default Welcome