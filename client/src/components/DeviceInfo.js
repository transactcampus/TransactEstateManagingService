import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDevice } from '../actions';
import TableInfo from './TableInfo';
import ClickableTable from './ClickableTable';

class DeviceInfo extends Component {
    componentDidMount() {
        this.props.fetchDevice();
    }

    render() {

        return (
            <div>
                <ClickableTable {...this.props} />
            </div>
        );
    }

}

function mapStateToProps(state) {
    return { deviceInfo: state.deviceInfo.devicesInfos }
}
export default connect(mapStateToProps, { fetchDevice })(DeviceInfo);