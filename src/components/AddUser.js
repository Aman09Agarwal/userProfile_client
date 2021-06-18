import React, { Component } from "react";
import {
  FormGroup,
  Label,
  Input,
  Form,
  Row,
  Col,
  Container,
  Button,
  Alert,
} from "reactstrap";

import "./componentCss/UserCard.css";
import avatarData from "../data/avatar.json";

import { connect } from "react-redux";
import { postUser } from "../actions/userActions";

class AddUser extends Component {
  constructor() {
    super();
    this.state = {
      userid: "",
      name: "",
      address: "",
      avatar: "avatar 1",
      visibleSuccess: false,
      visibledanger: false,
      emptyFields: false,
    };
    this.handleChangeTextFields = this.handleChangeTextFields.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismissSuccess = this.onDismissSuccess.bind(this);
    this.onDismissDanger = this.onDismissDanger.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  handleChangeTextFields(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  async handleSubmit() {
    if (
      this.state.name === "" ||
      this.state.userid === "" ||
      this.state.avatar === ""
    )
      this.setState({ emptyFields: true });
    else {
      let data = {
        name: this.state.name,
        id: this.state.userid,
        Image: this.state.avatar,
      };
      await this.props.postUser(data);
      if (this.props.posted) this.setState({ visibleSuccess: true });
      else this.setState({ visibledanger: true });
    }
  }

  onDismissSuccess() {
    this.setState({ visibleSuccess: false });
    window.location.href = "/";
  }

  onDismissDanger() {
    this.setState({ visibledanger: false });
    window.location.href = "/addUser";
  }

  onDismiss() {
    this.setState({ emptyFields: false });
  }

  render() {
    return (
      <div>
        <Container>
          <Row style={{ padding: "10px 15px" }}>
            <span style={{ fontSize: "24px" }}>Add User</span>
          </Row>
          <Row>
            <Col style={{ padding: "24px 24px 0 0" }}>
              <img
                src={avatarData[this.state.avatar]}
                alt="avatar"
                style={{ height: "160px", width: "100%" }}
              />
              <FormGroup
                tag="fieldset"
                row
                style={{ textAlign: "center", margin: "22px 72px 0 72px" }}
              >
                <Label for="exampleSelect">Choose Avatar</Label>
                <Input
                  type="select"
                  name="avatar"
                  id="avatar"
                  value={this.state.avatar}
                  onChange={this.handleChangeTextFields}
                >
                  <option>avatar 1</option>
                  <option>avatar 2</option>
                  <option>avatar 3</option>
                  <option>avatar 4</option>
                  <option>avatar 5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col style={{ padding: "16px 0" }}>
              <Form>
                <FormGroup>
                  <Label for="userid" sm={2}>
                    User ID *
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="text"
                      name="userid"
                      id="userid"
                      value={this.state.userid}
                      placeholder="1001"
                      onChange={this.handleChangeTextFields}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="name" sm={2}>
                    Name *
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="name"
                      name="name"
                      id="name"
                      value={this.state.name}
                      placeholder="John"
                      onChange={this.handleChangeTextFields}
                    />
                  </Col>
                </FormGroup>
                <FormGroup>
                  <Label for="address" sm={2}>
                    Address
                  </Label>
                  <Col sm={10}>
                    <Input
                      type="address"
                      name="address"
                      id="address"
                      value={this.state.address}
                      placeholder="Highett Street, Richmond, Victoria..."
                      onChange={this.handleChangeTextFields}
                    />
                  </Col>
                </FormGroup>
                <FormGroup style={{ padding: "15px" }}>
                  <Button
                    href="/"
                    size="sm"
                    color="info"
                    style={{ marginRight: "16px" }}
                  >
                    Back
                  </Button>
                  <Button size="sm" color="dark" onClick={this.handleSubmit}>
                    Submit
                  </Button>
                </FormGroup>
              </Form>
            </Col>
          </Row>
          <Row>
            <Alert
              color="success"
              isOpen={this.state.visibleSuccess}
              toggle={this.onDismissSuccess}
            >
              New user has been added successfully!
            </Alert>
            <Alert
              color="danger"
              isOpen={this.state.visibledanger}
              toggle={this.onDismissDanger}
            >
              Oops! Something went wrong while adding new user.
            </Alert>
            <Alert
              color="danger"
              isOpen={this.state.emptyFields}
              toggle={this.onDismiss}
            >
              Please fill all the required fields correctly.
            </Alert>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posted: state.user.posted,
    postUser: ownProps.postUser,
  };
};
export default connect(mapStateToProps, {
  postUser: postUser,
})(AddUser);
