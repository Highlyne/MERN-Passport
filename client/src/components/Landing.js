import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Landing extends Component {
    constructor() {
   this.routeChange = this.routeChange.bind(this);
    }
    routeChange(){
     let path = `/login`;
     this.props.history.push(path);
     }
     render() {
    return (
        <div>
            <h1>Welcome to M.E.R.N. boiler plate with Passport </h1>
            <p>Please Log in or Sign Up </p>
            <button className="btn btn-primary col-1 col-mr-auto"
             onClick={this.routeChange}>Log In</button> <button>Sign Up</button>
        </div>
    )
    }
}
export default withRouter(Landing)