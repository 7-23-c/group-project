import React, { Component } from 'react';
import GoogleMapComponent from '../../Components/GoogleMap/GoogleMap';

class Map extends Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            long: 0,
        }
        this.pos = undefined;
        this.watch = undefined;
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watch);
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                });
            }, null, { enableHighAccuracy: true, maximumAge: 0 });

            this.watch = navigator.geolocation.watchPosition((pos) => {
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
                loadingElement={<div style={{ height: 'calc(100vh - 64px)' }} />}
                containerElement={<div style={{ height: 'calc(100vh - 64px)' }} />}
                mapElement={<div style={{ height: 'calc(100vh - 64px)' }} />}
                defaultZoom={19}
                lat={this.state.lat}
                lng={this.state.long}
              />
            </React.Fragment>
        )
    }
}

export default Map;