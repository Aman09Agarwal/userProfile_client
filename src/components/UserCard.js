import React, { Component } from 'react';
import {
  Card, CardImg, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col
} from 'reactstrap';

import './componentCss/UserCard.css';

import { connect } from 'react-redux';
import { fetchUsers } from '../actions/userActions';

import avatarData from '../data/avatar.json';

class UserCard extends Component {
  
  state = {
    users: [],
    // search_username: ""
  }
  async componentDidMount() {
    await this.props.fetchUsers();
    this.setState({users: this.props.users.data});
  }

  

  render(){
    let filteredUsers = [];

    filteredUsers = this.state.users.filter(
      (user) => {
          return user.name.toLowerCase().indexOf(this.props.search.toLowerCase()) !== -1 ;
      }
    );

    return (
    <div>
      <Container>
      <Row xs="1" sm="2" md="3">
      {filteredUsers.map((user) => (
        <Col key={user.id} style={{padding: '10px'}}>
          <Card>
            <CardImg top height="180px" width="100%" src={avatarData[user.Image]} alt="Card image cap" style={{padding: '16px'}} />
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5">{user.name}</CardTitle>
                  <CardSubtitle className="mb-2 text-muted">User ID. {user.id}</CardSubtitle>
                </Col>
                <Col style={{textAlign:'right'}}>
                  <Button href={`/editUser?${user.id}`} size="sm" color="danger" style={{marginRight:'10px', marginTop:'16px'}}>Edit</Button>
                  <Button href={"/viewUser?"+user.id} size="sm" color="info" style={{ marginTop:'16px'}}>View</Button>
                </Col>
              </Row>
            </CardBody>
          </Card> 
        </Col>
      ))}
      </Row>
      </Container>
      
    </div>
  );
}
}

const mapStateToProps = (state, ownProps) => {
  return {
      users: state.user.users,
      error: state.user.error,
      search: state.user.search,
      fetchUsers: ownProps.fetchUsers
  }
}
export default connect(mapStateToProps, {
  fetchUsers: fetchUsers
})(UserCard);