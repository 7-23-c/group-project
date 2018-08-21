import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import BeaconIcon from '../../Images/beacon-pin.svg';

const GoogleMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    center={{ lat: props.lat, lng: props.lng }}
    defaultOptions={{
      streetViewControl: false,
      zoomControl: false,
      mapTypeControl: false,
      fullscreenControl: false,
    }}
  >

  <Marker
    position={{ lat: props.lat, lng: props.lng }}
    icon={require('../../Images/user-pin.svg')}
    title="Your Current Position"
  />

  </GoogleMap>
));

export default GoogleMapComponent;