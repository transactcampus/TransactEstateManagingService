import React, { Fragment } from 'react';
import { Nav, Navbar } from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link,
    Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import '../Navbar/Navbar.css';
import PropTypes from 'prop-types';
import { fetchUser, logout } from '../../actions/index';

const NavBar = ({ auth, fetchUser, logout }) => {

    const guestLinks = (
        <Fragment>
            <Navbar className="py-0" collapseOnSelect sticky="top" expand="lg" bg="danger" variant="dark" >
                <Navbar.Brand className="py-0" href="#"><img
                    src="../../images/transactLogo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align"

                />TRANSACT ESTATE MANAGER</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/aboutus">
                            <Nav.Link className="py-0 bg-danger" href="#aboutus">About Us</Nav.Link>
                        </Link>
                    </Nav>
                    <Nav className="ml-auto bg-danger">
                        <a href="/api/auth">Login with Azure</a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );

    const authLinks = (

        <Fragment>
            <Navbar className="py-0" collapseOnSelect sticky="top" expand="lg" bg="danger" variant="dark">
                <Navbar.Brand className="py-0" href="#"><img
                    src="../../images/transactLogo.png"
                    width="30"
                    height="30"
                    className="d-inline-block align"

                />TRANSACT ESTATE MANAGER</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/dashboard">
                            <Nav.Link className="py-0 bg-danger" href="#dashboard">Dashboard</Nav.Link>
                        </Link>
                        <Link to="/devicelocations">
                            <Nav.Link className="py-0 bg-danger" href="#devicelocations">Device Locations</Nav.Link>
                        </Link>
                        <Link to="/aboutus">
                            <Nav.Link className="py-0 bg-danger" href="#aboutus">About Us</Nav.Link>
                        </Link>
                    </Nav>
                    <Nav className="bg-danger">
                        <a onClick={logout} href="/api/auth/logout">Logout</a>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    );

    return (

        <Fragment>{auth.user ? authLinks : guestLinks}</Fragment>
    )
}

Navbar.propTypes = {
    fetchUser: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, { fetchUser, logout })(NavBar);