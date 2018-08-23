// import react components
import React from 'react';
import Modal from 'react-modal';

// import components
import Progress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Button from '@material-ui/core/Button';
import Axios from 'axios';

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
        }
        this.getPresignedUrls = this.getPresignedUrls.bind(this);
        this.preview = this.preview.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
        console.log(this.state.beacon);
        let len = this.state.beacon.images.length
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
            console.log(err);
        })
    }

    preview(src, desc) {
        this.setState({
            imagePreview: src,
            imageDescription: desc
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
                <GridListTile key={key} cols={1}>
                    <img onClick={() => this.preview(image.url, image.description)} src={image.url} alt={image.alt} />
                </GridListTile>
            )
        })

        return (
            <div className="Beacon">
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Preview Image"
                >
                    <img alt="placeholder" className="modalImage" src={this.state.imagePreview}  width="100%" height="auto"/>
                    <p>{this.state.imageDescription}</p>
                    <Button
                        onClick={this.closeModal}
                        color="secondary"
                        variant="contained"
                    >
                        Close
                    </Button>
                </Modal>
                <h3>{this.state.beacon.name}</h3>
                <h4>{this.state.beacon.description}</h4>
                <h5>Created On: {fullDate} by {created_by.name.first} {created_by.name.last}</h5>
                <div className="images">
                    <GridList cellHeight={160} cols={3}>
                        {images}
                    </GridList>
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

export default Beacon;