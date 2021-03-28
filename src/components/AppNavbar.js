import React, { Component } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarText,
  Container, 
  Button,
  InputGroup,
  InputGroupAddon,
  Input,
  Col,
  Row
} from 'reactstrap';
import './componentCss/AppNavbar.css';

import { connect } from 'react-redux';
import { searchUser } from '../actions/userActions';

class AppNavbar extends Component {
  constructor(){
    super();
    this.state = {
        search: ""
    }
    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch(evt) {      
    await this.setState({ [evt.target.name]: evt.target.value });
    this.props.searchUser(this.state.search);
  }

  render(){
    return (
        <div>
        <Navbar color="dark" dark expand="md" fixed="top" className="py-md-0 py-0">
          <Container>
          <NavbarBrand href="/">User Profile</NavbarBrand>
          <NavbarText>
            <Row>
              <Col className="col-8">
                <InputGroup size="sm">
                <InputGroupAddon addonType="prepend">Search</InputGroupAddon>
                <Input type="search" name="search" value={this.state.search} onChange={this.handleSearch} id="exampleSearch" placeholder="Username..."/>
                </InputGroup>
              </Col>
              <Col style={{textAlign:'right'}} className="col-4">
                <Button href="/addUser" size="sm" outline color="info">Add User</Button>
              </Col>
            </Row>
          </NavbarText>
          </Container>
        </Navbar>
        </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      searchUser: ownProps.searchUser
  }
}
export default connect(mapStateToProps, {
  searchUser: searchUser
})(AppNavbar);