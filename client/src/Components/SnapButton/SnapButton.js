import React from 'react';
import FAB from '@material-ui/core/Button/Button';
import FaPlus from 'react-icons/lib/fa/plus';
import FaCamera from 'react-icons/lib/fa/camera';
import FaMapMarkerAlt from 'react-icons/lib/fa/map-marker';
import './SnapButton.css';

class SnapButton extends React.Component {
    constructor() {
        super();
        this.state = {
            toggled: false,
        }
    }

    toggleMenu = () => {
        this.setState({
            toggled: !this.state.toggled
        });
    }

    render() {
        return (
            <div className="Menu">
                { this.state.toggled
                    ? <div><FAB
                    onClick={this.createMarker}
                    color="secondary"
                    variant="fab"
                    children={<FaMapMarkerAlt />}
                    className="FABMENU"
                    style={{ position: 'absolute', bottom: '25px', right: '-10px' }}
                /><FAB
                    onClick={this.openCamera}
                    color="secondary"
                    variant="fab"
                    children={<FaCamera />}
                    className="FABMENU"
                    style={{ position: 'absolute', bottom: '25px', left: '5px' }}
                /></div>
                    : null }
                <FAB
                    onClick={this.toggleMenu}
                    color="primary"
                    variant="fab"
                    children={<FaPlus />}
                    style={{ position: 'absolute' }}
                />
            </div>
        )
    }
}

export default SnapButton;