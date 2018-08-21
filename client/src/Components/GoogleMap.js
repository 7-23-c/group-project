import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

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
  </GoogleMap>
));

export default GoogleMapComponent;