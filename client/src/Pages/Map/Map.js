import React, { Component } from 'react';
import GoogleMapComponent from '../../Components/GoogleMap/GoogleMap';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            long: 0,
        }
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                });
            }, null, { enableHighAccuracy: true });

            navigator.geolocation.watchPosition((pos) => {
                this.setState({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                });
            }, null, { enableHighAccuracy: true });
        }
    }

    render() {
        return (
            <React.Fragment>
                <GoogleMapComponent 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkU8bb3zs9fjyDTW7fJqzD3P-gaSc_rU4"
                loadingElement={<div style={{ height: '100vh' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: 'calc(100vh - 65px)' }} />}
                defaultZoom={19}
                lat={this.state.lat}
                lng={this.state.long}
              />
            </React.Fragment>
        )
    }
}

export default Map;