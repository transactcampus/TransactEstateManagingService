import { MuiThemeProvider, Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOnlineCount } from '../actions';
import { fetchOfflineCount } from '../actions';
import { createMuiTheme } from '@material-ui/core/styles';
import { indigo, green } from '@material-ui/core/colors';


const theme = createMuiTheme({
    palette: {
        primary: green,
        secondary: indigo,
    },
});

class OnlineCount extends Component {
    componentDidMount() {
        this.props.fetchOnlineCount();
    }

    render() {

        return (
            <div className='border border-primary bg-primary text-light'>

                <h4 className='text-center'>Total Online Devices</h4>
                <h4 className='text-center'>{this.props.deviceOnlineCount}</h4>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return { deviceOnlineCount: state.deviceInfo.onlineCount }
}


export default connect(mapStateToProps, { fetchOnlineCount, fetchOfflineCount })(OnlineCount);