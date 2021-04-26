import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchHistory } from '../actions';
import ListGroup from 'react-bootstrap/ListGroup';
import { BsFillCircleFill } from "react-icons/bs";

class DeviceHistory extends Component {
    componentDidMount() {
        this.props.fetchHistory();
        console.log(this.props)
    }



    renderHistory() {
        if (this.props.deviceHistory.result) {
            return (
                <div>
                    <ListGroup>
                        {
                            this.props.deviceHistory.result.map(deviceHist => {
                                if (this.props.id === deviceHist.device_id) {
                                    if (deviceHist.status === "online") {
                                        return (
                                            <ListGroup.Item><BsFillCircleFill color="green" />   {deviceHist.statusDateTime} </ListGroup.Item>
                                        );
                                    }
                                    else if (deviceHist.status === "offline") {
                                        return (
                                            <ListGroup.Item><BsFillCircleFill color="red" />  {deviceHist.statusDateTime} </ListGroup.Item>
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
        // console.log(Object.values(this.props.deviceHistory))
        //console.log(this.props.deviceHistory.result)

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
export default connect(mapStateToProps, { fetchHistory })(DeviceHistory);