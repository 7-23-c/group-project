import React, { Component } from 'react';
import { GoogleMap, Marker } from 'react-google-maps';

import GoogleMapComponent from '../Components/GoogleMap';

class Map extends Component {

    render() {
        return (
            <div>
                <GoogleMapComponent 
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkU8bb3zs9fjyDTW7fJqzD3P-gaSc_rU4"
                loadingElement={<div style={{ height: '100vh' }} />}
                containerElement={<div style={{ height: '400px' }} />}
                mapElement={<div style={{ height: '100vh' }} />}
                defaultZoom={8}
                lat={-34.397}
                lng={150.644}
              />
            </div>
        )
    }
}

export default Map;