// import react components
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

// import css
import './Map.css';

class Map extends Component {
    render() {
        const googleMap = withGoogleMap(props => (
            <GoogleMap defaultCenter = { { lat: 40.756795, ln: -73.954298 } } defaultZoom = { 13 }>
            </GoogleMap>
        ));

        return (
            <div>
                <googleMap containerElement={ <div style={ { height: '500px', width:'500px' } } /> }
                    mapElement={ <div style={{ height: '100%' }}/>}
                />
            </div>
        )
    }
}

export default Map;