import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import AppNavbar from './components/AppNavbar';
import UserCard from './components/UserCard';
import AddUser from './components/AddUser';
import ViewUser from './components/ViewUser';
import EditUser from './components/EditUser';
import store from './store';

import { Provider } from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <AppNavbar /><br/><br/><br/><br/>
          <Switch>
              <Route exact path='/' component={UserCard} />
              <Route path='/addUser' component={AddUser} />
              <Route path='/viewUser' component={ViewUser} />
              <Route path='/editUser' component={EditUser} />
          </Switch>
          <br/><br/><br/>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
