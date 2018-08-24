// import react components
import React from 'react';

// import google maps components
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Circle
} from 'react-google-maps';

// import custom components
import SnapButton from '../SnapButton/SnapButton';

// import needed css
import './GoogleMap.css';

const GoogleMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        className="GoogleMap"
        defaultZoom={props.defaultZoom}
        defaultCenter={{
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

        { props.beacons.length > 0
            ?   props.beacons.map((beacon, key) => {
                    return (
                        <React.Fragment key={key}>
                            <Circle
                                key={key + 1}
                                center={{
                                    lat: beacon.location.coordinates[1],
                                    lng: beacon.location.coordinates[0]
                                }}
                                options={{
                                    fillColor: '#3F51B5',
                                    strokeWeight: 1
                                }}
                                radius={10}
                                visible={true}
                                clickable={false}
                            />
                            <Marker
                                key={key}
                                position={{
                                    lat: beacon.location.coordinates[1],
                                    lng: beacon.location.coordinates[0]
                                }}
                                icon={require('../../Images/beacon-pin.svg')}
                                title={beacon.name}
                                onClick={() => window.location = `/beacon/${beacon._id}`}
                                clickable={true}
                            />
                        </React.Fragment>
                    )
                            
                })
            :   null
        }

        <Marker
            position={{
                lat: props.lat,
                lng: props.lng
            }}
            icon={require('../../Images/user-pin.svg')}
            clickable={false}
        />
        <SnapButton createBeacon={props.createBeacon} />
    </GoogleMap>
));

export default GoogleMapComponent;