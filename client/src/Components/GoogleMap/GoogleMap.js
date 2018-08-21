import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import BeaconIcon from '../../Images/beacon-pin.svg';
import SnapButton from '../SnapButton/SnapButton';
import './GoogleMap.css';

const GoogleMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        className="GoogleMap"
        defaultZoom={props.defaultZoom}
        center={{
            lat: props.lat,
            lng: props.lng
        }}
        defaultOptions={{
            streetViewControl: false,
            zoomControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
    >

    <Marker
        position={{
            lat: props.lat,
            lng: props.lng
        }}
        icon={require('../../Images/user-pin.svg')}
        title="Your Current Position"
    />
    
    { props.beacons.length > 0
    ? props.beacons.map((beacon, key) => {
        return <Marker
                    key={key}
                    position={{
                        lat: beacon.location.coordinates[1],
                        lng: beacon.location.coordinates[0]
                    }}
                    icon={require('../../Images/beacon-pin.svg')}
                    title={beacon.name}
                />
    })
    : null
    }

    <SnapButton createBeacon={props.createBeacon} />
    </GoogleMap>
));

export default GoogleMapComponent;