import React, { Component } from 'react';
import {
    FormGroup, Label, Input, Form,
    Row, Col, Container, Button, Alert
} from 'reactstrap';

import './componentCss/UserCard.css';
import avatarData from '../data/avatar.json';

import { connect } from 'react-redux';
import { updateUser, deleteUser, fetchUser } from '../actions/userActions';

class AddUser extends Component {
  constructor(){
    super();
    this.state = {
        userid: "",
        name: "",
        address: "",
        avatar: "avatar 1",
        visibleSuccess: false,
        visibleDanger: false,
        emptyFields: false,
        visibleDeleteSuccess: false,
        visibleDeleteDanger: false,
    }
    this.handleChangeTextFields = this.handleChangeTextFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissDanger = this.onDismissDanger.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onDismissDeleteSuccess = this.onDismissDeleteSuccess.bind(this);
    this.onDismissDeleteDanger = this.onDismissDeleteDanger.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchUser(this.props.location.search.substring(1));
    if(this.props.user !== undefined){
        var res = this.props.user.data;
        this.setState({userid: res.id, name: res.name, address: res.address===undefined?"":res.address, avatar: res.Image});
    }
  }

  handleChangeTextFields(evt) {      
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit() {
    if(this.state.name === "" || this.state.userid === "" || this.state.avatar === "")
        this.setState({ emptyFields: true });
    else
    {
        let data = {"name": this.state.name, "id": this.state.userid, "Image": this.state.avatar, "address": this.state.address}
        await this.props.updateUser(this.props.location.search.substring(1),data);
        if(this.props.updated)
            this.setState({ visibleSuccess: true });
        else
            this.setState({ visibleDanger: true });
    } 
  }

  async handleDelete() {
    await this.props.deleteUser(this.props.location.search.substring(1));
    if(this.props.deleted)
        this.setState({ visibleDeleteSuccess: true });
    else
        this.setState({ visibleDeleteDanger: true });
  }

  onDismissSuccess() {
    this.setState({ visibleSuccess: false });
    window.location.href = "/";
  }

  onDismissDanger() {
    this.setState({ visibleDanger: false });
    window.location.href = "/editUser?"+this.state.userid;
  }

  onDismiss() {
    this.setState({ emptyFields: false });
  }

  onDismissDeleteSuccess() {
    this.setState({ visibleDeleteSuccess: false });
    window.location.href = "/";
  }

  onDismissDeleteDanger() {
    this.setState({ visibleDeleteDanger: false });
    window.location.href = "/editUser?"+this.state.userid;
  }

  render(){
    return (

    <div>
    <Container>
        <Row style={{padding: '10px 15px'}}>
            <span style={{fontSize: '24px'}}>Edit User</span>
        </Row>
        <Row>
            <Col style={{padding: '24px 24px 0 0'}}>
                <img src={avatarData[this.state.avatar]} alt="avatar" style={{height: '160px', width: '100%'}} />
                <FormGroup tag="fieldset" row style={{textAlign: 'center', margin: '22px 72px 0 72px'}}>
                    <Label for="exampleSelect">Choose Avatar</Label>
                    <Input type="select" name="avatar" id="avatar" value={this.state.avatar} onChange={this.handleChangeTextFields}>
                    <option>avatar 1</option>
                    <option>avatar 2</option>
                    <option>avatar 3</option>
                    <option>avatar 4</option>
                    <option>avatar 5</option>
                    </Input>
                </FormGroup>
            </Col>
            <Col style={{padding: '16px 0'}}>
                <Form>
                    <FormGroup>
                        <Label for="userid" sm={2}>User ID *</Label>
                        <Col sm={10}>
                        <Input type="text" name="userid" id="userid" value={this.state.userid} placeholder="1001" onChange={this.handleChangeTextFields}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="name" sm={2}>Name *</Label>
                        <Col sm={10}>
                        <Input type="name" name="name" id="name" value={this.state.name} placeholder="John" onChange={this.handleChangeTextFields}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="address" sm={2}>Address</Label>
                        <Col sm={10}>
                        <Input type="address" name="address" id="address" value={this.state.address}  placeholder="Highett Street, Richmond, Victoria..." onChange={this.handleChangeTextFields}/>
                        </Col>
                    </FormGroup>
                    <FormGroup style={{padding:'15px'}}>
                        <Button href="/" size="sm" color="info" style={{marginRight: '16px'}}>Back</Button>
                        <Button size="sm" color="danger" onClick={this.handleDelete} style={{marginRight: '16px'}}>Delete</Button>
                        <Button size="sm" color="dark" onClick={this.handleSubmit}>Save</Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
        <Row>
            <Alert color="success" isOpen={this.state.visibleSuccess} toggle={this.onDismissSuccess}>
                User information has been updated successfully!
            </Alert>
            <Alert color="danger" isOpen={this.state.visibleDanger} toggle={this.onDismissDanger}>
                Oops! Something went wrong while updating user information.
            </Alert>
            <Alert color="danger" isOpen={this.state.emptyFields} toggle={this.onDismiss}>
                Please fill all the required fields correctly.
            </Alert>
            <Alert color="success" isOpen={this.state.visibleDeleteSuccess} toggle={this.onDismissDeleteSuccess}>
                User has been deleted successfully!
            </Alert>
            <Alert color="danger" isOpen={this.state.visibleDeleteDanger} toggle={this.onDismissDeleteDanger}>
                Oops! Something went wrong while deleting user.
            </Alert>
        </Row>
    </Container>
    </div>
  );
}
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user.user,
        updated: state.user.updated,
        deleted: state.user.deleted,
        updateUser: ownProps.updateUser,
        deleteUser: ownProps.deleteUser,
        fetchUser: ownProps.fetchUser,
    }
  }
  export default connect(mapStateToProps, {
    updateUser: updateUser,
    deleteUser: deleteUser,
    fetchUser: fetchUser
  })(AddUser);