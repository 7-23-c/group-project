import React, { Component } from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import "./Registration.css";
import RegistrationForm from "./RegistrationForm";


class Registration extends Component {
    state = {
        fields: {}
    };
    //onChange stuff goes here:
    onChange = update => {
        this.setState({
            fields: {
                ...this.state.fields,
                ...update
            }
        });
    };

    render() {
        return (
            <MuiThemeProvider>
                <div className="Registration">
                    <div className="Registration-header">
                        <h1> Registration </h1>
                        <h2> Welcome new user! </h2>
                    </div>
                    <RegistrationForm onChange={fields => this.onChange(fields)} />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Registration;