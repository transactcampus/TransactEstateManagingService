import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
    component: Component,
    auth,
    ...rest
}) => (

        <Route
            {...rest}
            render={(props) =>

                auth.user ? (
                    <Component {...props} />
                ) : (
                        <Redirect to='/' />
                    )
            }
        />

    );

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(PrivateRoute);
