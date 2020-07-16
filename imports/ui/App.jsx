import React from 'react';
import Directory from '/imports/ui/pages/directory';
import { Login } from '/imports/ui/pages/auth';
import { Accounts } from 'meteor/accounts-base';
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.isLoggedIn = () => {
            const isUser = Accounts.user();
            const isUserId = Accounts.userId();
            return isUserId !== null ? <Directory /> : <Login />;
            // return Accounts.user() && Accounts.userId() ? <Dashboard /> : <Login />
        };
    }
    componentDidMount() {
        // this.isLoggedIn()
    }
    render() {
        return (<div>
        <this.isLoggedIn />
      </div>);
    }
}
