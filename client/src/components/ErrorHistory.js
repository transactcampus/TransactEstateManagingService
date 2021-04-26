import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../actions';
import ListGroup from 'react-bootstrap/ListGroup';

class ErrorHistory extends Component {
    componentDidMount() {
        this.props.fetchHistory();
    }



    renderHistory() {
        if (this.props.deviceHistory.result) {
            return (
                <div>
                    <ListGroup>
                        {
                            this.props.deviceHistory.result.map(deviceHist => {
                                if (this.props.id === deviceHist.device_id) {

                                    if (deviceHist.errorText != "" && deviceHist.errorText != "none" && deviceHist.errorText != "None") {
                                        return (
                                            <ListGroup.Item>{deviceHist.errorText} </ListGroup.Item>
                                        );
                                    }

                                }

                            })
                        }
                    </ListGroup>
                </div>
            )
        }
    }

    render() {

        return (
            <div>
                {this.renderHistory()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { deviceHistory: state.deviceHistory.deviceshistory }
}
export default connect(mapStateToProps, { fetchHistory })(ErrorHistory);