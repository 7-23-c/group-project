import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/Map';
import FriendIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navigation = () => {
    return (
        <React.Fragment>
            <List className="topNav">
                <ListItem button={true} component={Link} to="/map">
                    <ListItemIcon>
                        <MapIcon />
                    </ListItemIcon>
                    <ListItemText primary="Map" />
                </ListItem>
                <ListItem button={true} component={Link} to="/friends">
                    <ListItemIcon>
                        <FriendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Friends" />
                </ListItem>
            </List>
            <List>
                <ListItem button={true} component={Link} to="/settings">
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
            </List>
        </React.Fragment>
    )
}

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: false
        };
    }

    toggleDrawer = (open) => () => {
        this.setState({
          left: open,
        });
      };

    onLogout = () => {
        localStorage.removeItem('token');
        window.location = '/login';
    }

    render() {
        return (
            <React.Fragment>
                <AppBar position="static" className="root">
                    <Toolbar>
                        { this.props.isLoggedIn
                            ?   <IconButton
                                    onClick={this.toggleDrawer(true)}
                                    className="menuButton"
                                    color="inherit"
                                    aria-label="Menu"
                                >
                                    <MenuIcon />
                                </IconButton>
                            : null
                        }
                        
                        <Typography className="flex" variant="title" color="inherit">
                            Beacons
                        </Typography>
                        
                        { this.props.isLoggedIn
                            ? <Button onClick={this.onLogout} color="inherit">Logout</Button>
                            : null
                        }
                    </Toolbar>
                </AppBar>
                        
                <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                        className="topNavContainer"
                    >
                        <div className="list">
                            <Navigation />
                        </div>
                    </div>
                </Drawer>
            </React.Fragment>
        )
    }
}

export default Navbar;