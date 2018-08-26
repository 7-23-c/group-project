// import react components
import React from 'react';
import { Link } from 'react-router-dom';

// import components
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Progress from '@material-ui/core/CircularProgress';
import Axios from 'axios';

// import css
import './Beacons.css';

class Beacons extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            beacons: []
        }
    }

    componentWillMount() {
        Axios.get('/beacons', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            this.setState({
                beacons: res.data.beacons,
                ready: true,
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render() {
        if (!this.state.ready) {
            return (
                <div className="Progress">
                    <div className="loader">
                        <Progress size={80} />
                        <h3>Loading</h3>
                    </div>
                </div>
            )
        } else {
            let beacons = this.state.beacons.map((beacon, key) => {
                let date = new Date(beacon.created_at);
                let month = date.getMonth() + 1;
                let day = date.getDate();
                let year = date.getFullYear();
                let fullDate = `${month}/${day}/${year}`;
                return (
                    <ListItem key={key} button={true} component={Link} to={`/beacon/${beacon._id}`}>
                        <ListItemText primary={beacon.name} secondary={`${fullDate} - ${beacon.images.length} Images`} />
                    </ListItem>
                )
            });

            return (
                <div className="BeaconList">
                    <div>
                        <h1>Your Beacons</h1>
                        <List>
                            {beacons}
                        </List>
                    </div>
                </div>
            )
        }
    }
}

export default Beacons;