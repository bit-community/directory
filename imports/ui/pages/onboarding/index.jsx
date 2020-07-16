import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AccountSetup from './Account';
import Profile from './Profile';
import Complete from './Feedback';
import * as Analytics from '/imports/ui/analytics';
// import path from '/imports/ui/path'
export default class Onboarding extends Component {
    constructor(props) {
        super(props);
        this.updateState = (value) => {
            const oldStore = this.state;
            const newState = Object.assign(oldStore, value);
            this.setState({ ...newState });
            console.log("STATE HAS BEEN UPDATED WITH NEW VALUES", this.state);
        };
        // updateState = (key: string, value: string) => {
        // 	this.setState({ [key]: value });
        // 	console.log("STATE HAS BEEN UPDATED WITH NEW VALUES", this.state)
        // }
        this.onSubmit = async () => {
            console.log(this.state);
            await Analytics.track('Submit Profile', this.state);
            alert('Thank you');
            window.location.replace('/');
        };
        this.state = {};
    }
    render() {
        return (<Switch>
				<Route path="/onboarding" exact><AccountSetup data={this.state} updateState={this.updateState}/></Route>
				<Route path="/onboarding/profile" exact><Profile data={this.state} updateState={this.updateState} onSubmit={this.onSubmit}/></Route>
				<Route path="/onboarding/complete" exact><Complete data={this.state} updateState={this.updateState} onSubmit={this.onSubmit}/></Route>
			</Switch>);
    }
}
