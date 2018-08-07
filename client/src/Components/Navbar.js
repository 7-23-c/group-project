import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PersonIcon from '@material-ui/icons/PersonOutlined';
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

    onLogout = function() {
        localStorage.removeItem('token');
        window.location = '/login';
    }

    onLogin = function() {
        if (window.location.pathname !== '/login') {
            window.location = '/login';
        }
    }

    render() {
        return (
            <div className="root">
                <AppBar position="static">
                    <Toolbar>
                        { this.props.isLoggedIn
                            ?   <IconButton onClick={this.toggleDrawer(true)} className="menuButton" color="inherit" aria-label="Menu">
                                    <MenuIcon />
                                </IconButton>
                            : null
                        }
                        
                        <Typography className="flex" variant="title" color="inherit">
                            Beacons
                        </Typography>
                        { this.props.isLoggedIn
                            ? <Button onClick={this.onLogout} color="inherit">Logout</Button>
                            : <Button onClick={this.onLogin} color="inherit">Login</Button>
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
                            <List className="topNav">
                                <ListItem button={true}>
                                    <ListItemIcon>
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Test" />
                                </ListItem>
                            </List>
                            <List>
                                <ListItem button={true}>
                                    <ListItemText primary="Test" />
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default Navbar;