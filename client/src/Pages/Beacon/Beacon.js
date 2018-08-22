import React from 'react';
import Axios from 'axios';

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
            return <h1>Loading Beacon...</h1>
        }

        let date = new Date(this.state.beacon.created_at);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let fullDate = `${month}/${day}/${year}`;

        let { created_by } = this.state.beacon;

        let images = this.state.images.map((image, key) => {
            return <img key={key} src={image} alt="" />
        })

        return (
            <div className="Beacon">
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

export default Beacon;