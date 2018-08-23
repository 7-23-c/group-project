// import react components
import React from 'react';
import Modal from 'react-modal';

// import components
import Progress from '@material-ui/core/CircularProgress';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
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
            images: []
        }
        this.getPresignedUrls = this.getPresignedUrls.bind(this);
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

    getPresignedUrls() {
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
                images: res.data.image_urls
            })
        })
        .catch(err => {
            console.log(err);
        })
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
                    <img src={image} alt="" />
                </GridListTile>
            )
        })

        return (
            <div className="Beacon">
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

export default Beacon;