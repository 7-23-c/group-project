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

import InboxIcon from '@material-ui/icons/Inbox';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false
        };
    }

    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
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
                            ?   <IconButton onClick={this.toggleDrawer('left', true)} className="menuButton" color="inherit" aria-label="Menu">
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
                        
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                >
                    <div className="list">
                        <List>
                            <ListItem button={true}>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
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