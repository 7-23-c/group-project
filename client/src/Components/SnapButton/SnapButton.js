import React from 'react';
import FAB from '@material-ui/core/Button/Button';
import FaCamera from 'react-icons/lib/fa/camera';
import './SnapButton.css';

class SnapButton extends React.Component {
    constructor() {
        super();
        this.inputRef = React.createRef();
    }

    capturePhoto = () => {
        this.inputRef.current.click();
    }

    render() {
        return (
            <React.Fragment>
                <FAB
                    color="secondary"
                    variant="fab"
                    children={<FaCamera />}
                    className="Menu"
                    onClick={this.capturePhoto}
                    style={{ position: "absolute", bottom: "10px", left: "50%", transform: "translateX(-50%)" }}
                />
                <input type="file" hidden={true} ref={this.inputRef} accept="image/*" capture="camera" />
            </React.Fragment>
        )
    }
}

export default SnapButton;