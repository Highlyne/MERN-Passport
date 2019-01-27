import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

  class Toolbar extends Component {
    constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.signout = this.signout.bind(this)
    this.getUser = this.props.getUser.bind(this)
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  signout() {
    console.log('Running signout function')    
		axios({
            method: 'GET',
            url: '/logout'
		})
		.then(response => {
      console.log('client side hit logout route: ')
      console.log(response)
      if (response.status === 200) {
          // update App.js state
          this.getUser()
      }
  }).catch(error => {
      console.log('logout error: ')
      console.log(error);
      
  })
}
  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
  } else {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">React Boiler Plate</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/login">Log-In</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/Highlyne/MERN-Stack">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <NavLink href="/login">Log-In</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                  <NavLink 
                  onClick={this.signout}>Log-Out</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                  <NavLink href="/signup">Register</NavLink>
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
    }
  }
}

export default Toolbar