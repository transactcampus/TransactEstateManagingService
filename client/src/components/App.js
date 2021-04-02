import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
//import Dashboard from './Dashboard';
import Login from './Login';
import Dashboard from './NewDashboard';

import { connect } from 'react-redux';
import * as actions from '../actions';
//Redux 
import { Provider } from 'react-redux';
import store from '../store';


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      //<Provider store={store}>
      <div className="container-fluid">
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Header} />
            <Route exact path="/" component={Login} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
      //</Provider>

    );
  }

}

//connect function helps connect react and redux
export default connect(null, actions)(App);

