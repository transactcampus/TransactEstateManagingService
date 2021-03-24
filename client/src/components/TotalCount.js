import { Typography } from '@material-ui/core';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOnlineCount } from '../actions';
import { fetchOfflineCount } from '../actions';

class TotalCount extends Component {
    componentDidMount() {
        this.props.fetchOfflineCount();
        this.props.fetchOnlineCount();
    }
    render() {
        console.log(this.props);
        return (
            <div>
                <Typography variant="h5">Total Connected Devices</Typography>
                <Typography variant="h3" align="center" color="secondary">{this.props.deviceOfflineCount + this.props.deviceOnlineCount}</Typography>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { deviceOfflineCount: state.deviceInfo.offlineCount, deviceOnlineCount: state.deviceInfo.onlineCount }
}


export default connect(mapStateToProps, { fetchOnlineCount, fetchOfflineCount })(TotalCount);