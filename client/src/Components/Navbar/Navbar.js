// import react components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import icons
import MenuIcon from '@material-ui/icons/Menu';
import MapIcon from '@material-ui/icons/LocationOn';
import FriendIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/SettingsRounded';
import CameraIcon from '@material-ui/icons/CameraAlt';

// import css
import './Navbar.css';

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
        localStorage.removeItem('user');
        window.location = '/';
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
                        
                        <div className="flex">
                            <Typography style={{fontFamily: 'Kaushan Script, cursive'}} component={Link} to="/map"  variant="title" color="inherit">
                                Beacons
                            </Typography>
                        </div>
                        
                        { this.props.isLoggedIn
                            ? <Button onClick={this.onLogout} color="inherit">Logout</Button>
                            : <React.Fragment><Button component={Link} to="/" color="inherit">Login</Button> or <Button component={Link} to="/register" color="inherit">Register</Button></React.Fragment>
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
                <ListItem button={true} component={Link} to="/beacons">
                    <ListItemIcon>
                        <CameraIcon />
                    </ListItemIcon>
                    <ListItemText primary="Beacons" />
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

export default Navbar;