import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTotalCount } from '../actions';
import StatusPieChart from './StatusPieChart';

class StatusAnalytic extends Component {
    componentDidMount() {
        this.props.fetchTotalCount();

    }

    render() {
        return (
            <div >
                <StatusPieChart {...this.props} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { totalcount: state.deviceInfo.totalCount }
}
export default connect(mapStateToProps, { fetchTotalCount })(StatusAnalytic);