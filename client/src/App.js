import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import logo from './logo.svg'
import './App.css'
import axios from 'axios'
// components
import Navbar from './components/Navbar'
import Signup from './components/Signup-Form'
import LoginForm from './components/Login-Form'
import Dashboard from './components/Dashboard'

class App extends Component {
  constructor() {
    super()
    this.state = {
      response: '',
      post: '',
      responseToPost: '',
      loggedIn: false,
      username: null,
      redirectTo: ''
    }
    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }
  componentDidMount() {
    this.getUser()
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }
 
  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else if (response.status === 201) {
        console.log('User is not authenticated');
        this.setState({
          loggedIn: false,
          username: null,
          redirectTo: '/'
        })
      }
    })
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: this.state.post }),
    });
    const body = await response.text();
    this.setState({ responseToPost: body });
  };
  render() {
    return (
      <div className="App">
        <Navbar 
        getUser={this.getUser}/>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <p>{this.state.response}</p>
        <form onSubmit={this.handleSubmit}>
          <p>
            <strong>Post to Server:</strong>
          </p>
          <input
            type="text"
            value={this.state.post}
            onChange={e => this.setState({ post: e.target.value })}
          />
          <button type="submit">Submit</button>
        </form>
        <p>{this.state.responseToPost}</p>
         {/* Routes to different components */}
         <Router>
            <Switch>              
              <Route
                exact path="/dashboard"
                render={() =>
                <Dashboard
                username={this.state.username}
                 />}
                 />
              <Route
                exact path="/login"
                render={() =>
                  <LoginForm
                  redirectTo = {this.redirectTo}
                    updateUser={this.updateUser}
                  />}
              />
              <Route
                exact path="/signup"
                render={() =>
                  <Signup />}
              />
            </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
