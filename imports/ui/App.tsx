import React from 'react'
import Directory from '/imports/ui/pages/directory'
import { Login } from '/imports/ui/pages/auth'
import { Accounts } from 'meteor/accounts-base'

// import Layout from './Layout'
type AppProps = {
  msg: string
}

export default class App extends React.Component<{}, AppProps> {
  constructor(props: any) {
    super(props)
  }

  isLoggedIn = (): JSX.Element => {
    const isUserId = Accounts.userId()

    return isUserId !== null ? <Directory /> : <Login />

    // return Accounts.user() && Accounts.userId() ? <Dashboard /> : <Login />
  }

  render(): JSX.Element {
    return (
      <div>
        <Directory />
      </div>
    )
  }
}
