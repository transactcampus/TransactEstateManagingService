import React, { Fragment, Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Homepage from './Homepage';
import Dashboard from './NewDashboard';
import Maps from './Maps';
import Navbar from './Navbar/Navbar';
import Aboutus from './Aboutus';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PrivateRoute from '../components/Routing/PrivateRoute';
//Redux 
import { Provider } from 'react-redux';
import store from '../store';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {

    return (
      // <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Login} />
            <PrivateRoute exact path="/dashboard" component={Homepage} />
            <PrivateRoute exact path="/devicelocations" component={Maps} />
            <Route exact path="/aboutus" component={Aboutus} />
          </Switch>
        </Fragment>
      </BrowserRouter>
      // </Provider>
    );
  }

}

function mapStateToProps(state) {
  return { auth: state.auth };
}

//connect function helps connect react and redux
export default connect(mapStateToProps, actions)(App);

