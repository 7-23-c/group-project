// import react components
import React from 'react';
import Modal from 'react-modal';

// import components
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Progress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// import custom components
import GoogleMapComponent from '../../Components/GoogleMap/GoogleMap';

// import css
import './Map.css';

// set up our modal
Modal.setAppElement('#app')

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            long: 0,
            beacons: [],
            modalIsOpen: false,
            imageUpload: '',
            imageDescription: '',
            imageForUpload: null,
            ready: false,
            beaconQuery: false,
            lastLocation: {
                lat: undefined,
                long: undefined,
            },
            snackOpen: false,
        }
        this.watch = undefined;
        this.beaconTimer = undefined;
        this.input = undefined

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createTheBeacon = this.createTheBeacon.bind(this);
        this.getNearbyBeacons = this.getNearbyBeacons.bind(this);
        this.createBeacon = this.createBeacon.bind(this);
    }

    componentWillUnmount() {
        // clear gps tracking
        navigator.geolocation.clearWatch(this.watch);
        // clear beacon tracking
        clearInterval(this.beaconTimer);
        // reset the timer
        this.beaconTimer = undefined;
    }

    componentWillMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                this.setState({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude,
                    ready: true,
                });
                this.startTimer();
            }, null, { enableHighAccuracy: true, maximumAge: 0 });

            this.watch = navigator.geolocation.watchPosition((pos) => {
                this.setState({
                    lat: pos.coords.latitude,
                    long: pos.coords.longitude
                });
            }, null, { enableHighAccuracy: true });
        }
    }

    openModal() { this.setState({ modalIsOpen: true }); }
    
    closeModal() {
        // clear the value of the input
        this.input.value = '';
        this.input = undefined;
        this.setState({
            modalIsOpen: false,
            beaconQuery: false
        });
    }

    // used to read the file contens of images and display a preview
    getImageContents(e) {
        var reader = new FileReader();
        reader.onload = () => {
            this.setState({
                imageUpload: reader.result
            });
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    // opens up our modal and gets the image preview
    createBeacon(e, input) {
        if (input.value === '') {
            return;
        }
        this.input = input;
        this.setState({
            imageForUpload: e.target.files[0],
        });
        this.getImageContents(e);
        this.openModal();
    }

    // change our image description
    handleChange(e) {
        this.setState({
            imageDescription: e.target.value
        });
    }

    // submit the beacon to the server
    createTheBeacon() {
        this.setState({
            beaconQuery: true
        });
        const formData = new FormData();
        formData.append('image', this.state.imageForUpload);
        formData.append('description', this.state.imageDescription);
        formData.append('latitude', this.state.lat);
        formData.append('longitude', this.state.long);

        Axios.post('/images', formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            this.closeModal();
            this.setState({
                snackOpen: true,
            });
            this.getNearbyBeacons(true);
        })
        .catch(err => {
            console.log(err);
        })
    }

    startTimer() {
        this.getNearbyBeacons();
        this.beaconTimer = setInterval(this.getNearbyBeacons, 10000);
    }

    getNearbyBeacons(reset = false) {
        let { lat, long } = this.state.lastLocation;
        let currentLat = this.state.lat;
        let currentLong = this.state.long;

        if (this.state.lastLocation.lat === undefined && this.state.lastLocation.long === undefined) {
            console.log('getting location');
            this.setState({
                lastLocation: {
                    lat: this.state.lat,
                    long: this.state.long,
                }
            });

            Axios.get(`/beacons?latitude=${this.state.lat}&longitude=${this.state.long}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.setState({
                    beacons: res.data.beacons
                })
            })
            .catch(err => {
                console.log(err);
            })
        } else if ( reset || currentLat > (lat + 1) || currentLong > (long + 1)) {
            this.setState({
                lastLocation: {
                    lat: this.state.lat,
                    long: this.state.long
                }
            });

            Axios.get(`/beacons?latitude=${this.state.lat}&longitude=${this.state.long}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.setState({
                    beacons: res.data.beacons
                })
            })
            .catch(err => {
                console.log(err);
            })
        } else {
            return;
        }
    }

    snackClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ snackOpen: false });
    };
    

    render() {
        if (!this.state.ready) {
            return (
                <div className="Progress">
                    <Progress size={80} />
                </div>
            );
        }

        return (
            <React.Fragment>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Create New Beacon"
                >
                    { this.state.beaconQuery
                        ?   <LinearProgress />
                        :   null
                    }
                    <h2>Upload an Image</h2>
                    <img alt="placeholder" src={this.state.imageUpload} width="200" height="auto" />
                    <TextField
                        multiline={true}
                        fullWidth={true}
                        type="text"
                        label="Description"
                        rows={4}
                        onChange={this.handleChange}
                    />
                    <Button
                        onClick={this.closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        title="Create Beacon"
                        variant="flat"
                        color="primary"
                        onClick={this.createTheBeacon}
                    >
                        Create Beacon
                    </Button>
                </Modal>
                <GoogleMapComponent 
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYern8-eaxuw153-3rlyRrxaqgtd07_eg"
                    loadingElement={<div style={{ height: 'calc(100vh - 64px)' }} />}
                    containerElement={<div style={{ height: 'calc(100vh - 64px)' }} />}
                    mapElement={<div style={{ height: 'calc(100vh - 64px)' }} />}
                    defaultZoom={19}
                    lat={this.state.lat}
                    lng={this.state.long}
                    beacons={this.state.beacons}
                    createBeacon={this.createBeacon}
                />
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackOpen}
                    autoHideDuration={6000}
                    onClose={this.snackClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Image Uploaded</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.snackClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                    />
            </React.Fragment>
        )
    }
}

const customStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '500px'
    }
};

export default Map;