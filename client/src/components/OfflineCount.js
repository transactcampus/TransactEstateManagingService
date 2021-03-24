import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOnlineCount } from '../actions';
import { fetchOfflineCount } from '../actions';

class OfflineCount extends Component {
    componentDidMount() {
        this.props.fetchOfflineCount();
    }

    render() {

        return (
            <div>
                <Typography variant="h5">Total Offline Devices</Typography>
                <Typography variant="h3" align="center" color="error">{this.props.deviceOfflineCount}</Typography>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return { deviceOfflineCount: state.deviceInfo.offlineCount }
}


export default connect(mapStateToProps, { fetchOnlineCount, fetchOfflineCount })(OfflineCount);