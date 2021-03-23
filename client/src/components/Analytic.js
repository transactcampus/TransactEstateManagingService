import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCategory } from '../actions';
import Chart from './Chart';

class Analytic extends Component {
    componentDidMount() {
        this.props.fetchCategory();
    }

    render() {
        return (
            <div >

                <Chart {...this.props} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { deviceCategory: state.deviceInfo.devicesCategory }
}
export default connect(mapStateToProps, { fetchCategory })(Analytic);