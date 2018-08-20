import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const GoogleMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={props.defaultZoom}
    defaultCenter={{ lat: props.lat, lng: props.lng }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
));

export default GoogleMapComponent;