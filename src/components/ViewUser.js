import React, { Component } from 'react';
import {
    FormGroup, Label, Input, Form,
    Row, Col, Container, Button
} from 'reactstrap';

import './componentCss/UserCard.css';
import avatarData from '../data/avatar.json';

import { connect } from 'react-redux';
import { fetchUser } from '../actions/userActions';

class AddUser extends Component {
  constructor(props){
    super(props);
    
    this.state = {
        userid: "",
        name: "",
        address: "",
        avatar: "avatar 1"
    }
  }

  async componentDidMount() {
    await this.props.fetchUser(this.props.location.search.substring(1));
    if(this.props.user !== undefined){
        var res = this.props.user.data;
        this.setState({userid: res.id, name: res.name, address: res.address===undefined?"":res.address, avatar: res.Image});
    }
  }

  render(){
    return (

    <div>
    <Container>
        <Row style={{padding: '10px 15px'}}>
            <span style={{fontSize: '24px'}}>User Information</span>
        </Row>
        <Row>
            <Col style={{padding: '24px 24px 0 0'}}>
                <img src={avatarData[this.state.avatar]} alt="avatar" style={{height: '240px', width: '100%'}} />
            </Col>
            <Col style={{padding: '16px 0'}}>
                <Form>
                    <FormGroup>
                        <Label for="userid" sm={2}>User ID *</Label>
                        <Col sm={10}>
                        <Input type="text" name="userid" id="userid" value={this.state.userid} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name" sm={2}>Name *</Label>
                        <Col sm={10}>
                        <Input type="name" name="name" id="name" value={this.state.name} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address" sm={2}>Address</Label>
                        <Col sm={10}>
                        <Input type="address" name="address" id="address" value={this.state.address} disabled/>
                        </Col>
                    </FormGroup>
                    <FormGroup style={{padding:'15px'}}>
                        <Button href="/" size="sm" color="dark" style={{marginRight: '16px'}}>Back</Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    </Container>
    </div>
  );
}
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.user,
        fetchUser: ownProps.fetchUser
    }
  }
  export default connect(mapStateToProps, {
    fetchUser: fetchUser
  })(AddUser);