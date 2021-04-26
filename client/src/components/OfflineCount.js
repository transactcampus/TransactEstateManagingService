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
            <div className='border border-danger bg-danger text-light'>
                <h4 className='text-center'>Total Offline Devices</h4>
                <h4 className='text-center'> {this.props.deviceOfflineCount}</h4>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return { deviceOfflineCount: state.deviceInfo.offlineCount }
}


export default connect(mapStateToProps, { fetchOnlineCount, fetchOfflineCount })(OfflineCount);