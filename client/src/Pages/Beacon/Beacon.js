// import react components
import React from 'react';
import Modal from 'react-modal';

// import components
import Progress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import Axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// import css
import './Beacon.css';

class Beacon extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            beacon: {},
            imagesToFetch: [],
            images: [],
            modalIsOpen: false,
            imagePreview: '',
            imageDescription: '',
            imageId: '',
            message: '',
            anchorEl: null
        }
        this.getPresignedUrls = this.getPresignedUrls.bind(this);
        this.preview = this.preview.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.deleteBeacon = this.deleteBeacon.bind(this);
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    deleteBeacon() {
        let confirm = window.confirm('Are you sure you want to delete this beacon and all it\'s images');

        if (confirm) {
            Axios.delete(`/beacons/${this.props.match.params.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                window.location = '/map';
            })
            .catch(err => {
                console.log('an error occured while trying to delete.');
            })
        }
    }

    componentWillMount() {
        Axios.get(`/beacons/${this.props.match.params.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.setState({
                beacon: res.data.beacon
            });

            this.getPresignedUrls();
        })
        .catch(err => {
            console.log(err);
        })
    }

    openModal() { this.setState({ modalIsOpen: true }); }
    
    closeModal() { this.setState({ modalIsOpen: false }); }

    getPresignedUrls() {
        let len = this.state.beacon.images.length;
        for(let i = 0; i < len; i++) {
            let imageId = this.state.beacon.images[i].image_id;

            this.setState({
                imagesToFetch: [
                    ...this.state.imagesToFetch,
                    imageId
                ]
            })
        }

        let url = JSON.stringify(this.state.imagesToFetch);
        Axios.get(`/images?images=${url}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            this.setState({
                ready: true,
                images: res.data.images
            })
        })
        .catch(err => {
            this.setState({
                images: []
            })
        })
    }

    deleteImage() {
        let confirm = window.confirm('Are you sure you want to delete this image?');

        if (confirm) {
            Axios.delete(`/images/${this.state.imageId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                this.setState({
                    message: res.data.success
                });
                this.getPresignedUrls();
                this.closeModal();
            })
            .catch(err => {
                this.setState({
                    message: err.response.data.error
                });
            });
        }
    }

    preview(src, desc, id) {
        this.setState({
            imagePreview: src,
            imageDescription: desc,
            imageId: id
        });
        this.openModal();
    }

    render() {
        if (!this.state.ready) {
            return (
                <div className="Progress">
                    <Progress size={80} />
                </div>
            )
        }

        let date = new Date(this.state.beacon.created_at);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let fullDate = `${month}/${day}/${year}`;

        let { created_by } = this.state.beacon;

        let images = this.state.images.map((image, key) => {
            return (
                <img key={key} onClick={() => this.preview(image.url, image.description, image.id)} src={image.url} alt={image.alt} />
            )
        })

        return (
            <div className="Beacon">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Preview Image"
                    defaultStyles={override}
                >
                    <Card
                        style={cardStyle}
                    >
                        <img alt="placeholder" className="modalImage" src={this.state.imagePreview}  width="100%" height="auto"/>
                        <p>{this.state.imageDescription}</p>
                        <Button
                            onClick={this.closeModal}
                            color="primary"
                            variant="contained"
                            style={{marginRight: '15px'}}
                        >
                            Close
                        </Button>
                        <Button
                            onClick={this.deleteImage}
                            color="secondary"
                            variant="contained"
                        >
                            Delete Image
                        </Button>
                    </Card>
                </Modal>
                { this.state.message.length > 0 ? <p className="message">{this.state.message}</p> : null}
                <IconButton
                    style={{color: '#ffffff', position: 'absolute'}}
                    className="SettingsIcon"
                    onClick={this.handleClick}
                >
                    <SettingsIcon />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.deleteBeacon}>Delete Beacon</MenuItem>
                </Menu>
                <h3>{this.state.beacon.name}</h3>
                <h4>{this.state.beacon.description}</h4>
                <h5>Created On: {fullDate} by {created_by.name.first} {created_by.name.last}</h5>
                <div className="images">
                    {images}
                </div>
            </div>
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
        maxWidth: '500px',
        maxHeight: '100vh'
    }
};

const cardStyle = {
    padding: '15px'
}

const override = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: 'none',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
      }
}

export default Beacon;