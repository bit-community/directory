import React, { Component } from 'react';

import { Switch, Route } from 'react-router-dom';

import AccountSetup from './Account';
import Profile from './Profile';
import * as Analytics from '/imports/ui/analytics'
// import path from '/imports/ui/path'

export default class Onboarding extends Component {
	constructor(props: any) {
		super(props);
		this.state = {

		}
	}

	updateState = (value: object) => {
		const oldStore = this.state;
		const newState = Object.assign(oldStore, value)
		this.setState({ ...newState });
		console.log("STATE HAS BEEN UPDATED WITH NEW VALUES", this.state)

	}

	// updateState = (key: string, value: string) => {
	// 	this.setState({ [key]: value });
	// 	console.log("STATE HAS BEEN UPDATED WITH NEW VALUES", this.state)
	// }

	onSubmit = async () => {
		console.log(this.state);
		await Analytics.track('Submit Profile', this.state);
		alert('Thank you')
		window.location.replace('/')
	};

	render() {
		return (
			<Switch>
				<Route path="/onboarding" exact><AccountSetup data={this.state} updateState={this.updateState} /></Route>
				<Route path="/onboarding/profile" exact><Profile data={this.state} updateState={this.updateState} onSubmit={this.onSubmit} /></Route>
			</Switch>
		);
	}
}
