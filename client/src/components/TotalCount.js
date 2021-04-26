
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

        return (
            <div className='border border-success bg-success text-light' >

                <h4 className='text-center'>Total Connected Devices</h4>
                <h4 className='text-center'>{this.props.deviceOfflineCount + this.props.deviceOnlineCount}</h4>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return { deviceOfflineCount: state.deviceInfo.offlineCount, deviceOnlineCount: state.deviceInfo.onlineCount }
}


export default connect(mapStateToProps, { fetchOnlineCount, fetchOfflineCount })(TotalCount);