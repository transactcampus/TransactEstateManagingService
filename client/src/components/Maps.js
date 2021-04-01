import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { connect } from 'react-redux';
import { fetchDevice } from '../actions';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class Maps extends Component {


    componentDidMount() {
        this.props.fetchDevice();
    }
    // constructor(props){
    //   super(props)
    //   this.state ={
    //     showingInfoWindow: false,
    //     activateMarker: {},
    //     selectedPlace: {}
    //   };
    // }
    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    greenMarker = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
    redMarker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

    onClose = props => {
        if (this.state.showInfoWindow) {
            this.setState({
                showInfoWindow: false,
                activemarker: null
            });
        }
    };

    renderMarker(deviceInfo) {
        var markerString = <p>+ "DeVice ID" +</p> + deviceInfo.device_id + "\n" + "Error Type: ";
        switch (deviceInfo.status) {
            case "online":
                return <Marker
                    onClick={this.onMarkerClick}
                    name={markerString}
                    position={{ lat: deviceInfo.lat, lng: deviceInfo.lng }}
                    icon={this.greenMarker} />
            case "offline":
                return <Marker position={{ lat: deviceInfo.lat, lng: deviceInfo.lng }} icon={this.redMarker} />
            default:
                return
        }
    }

    render() {
        console.log(this.props);
        const greenMarker = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
        const redMarker = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={
                        {
                            lat: 32.733390,
                            lng: -97.113690
                        }
                    }
                >
                    {
                        this.props.deviceInfo.map((di) =>
                            this.renderMarker(di),
                            <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
                                <div>sadadasdddddd</div>
                            </InfoWindow>
                        )
                    }
                    {/* <Marker onClick={this.onMarkerClick}  position={{ lat:32.733300, lng: -97.113600}} />*/}
                    <InfoWindow marker={this.state.activeMarker} visible={this.state.showingInfoWindow} onClose={this.onClose}>
                        <div>{this.state.selectedPlace.name}</div>
                    </InfoWindow>

                </Map>
            </div>

        );
    }
}


function mapStateToProps(state) {
    return { deviceInfo: state.deviceInfo.devicesInfos }
}
const connector = connect(mapStateToProps, { fetchDevice })(Maps);

export default GoogleApiWrapper({
    apiKey: 'AIzaSyD9kRBav8j5b-3BrioxesKfa5ZiTgUO_z4'
})(connector);