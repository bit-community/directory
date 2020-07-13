import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import * as Analytics from './analytics'
import path from './path'
import { Accounts } from 'meteor/accounts-base'

// Context Management Components
import Layout from '/imports/ui/Layout'
import App from '/imports/ui/App'
// --------------------------- End Context Management Components

// ************* All view Components Here *****************************************
import { Login, Signup, ResetPassword, Logout } from '/imports/ui/pages/auth'
import Preview from '/imports/ui/pages/preview'
import Baddie from '/imports/ui/pages/baddie'
// =============== Profile Components ============
import Account from '/imports/ui/pages/account'
import Onboarding from '/imports/ui/pages/onboarding'
import Profile from '/imports/ui/pages/profile'

function PrivateRoute({ component: Component, isLoggedIn, path, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={path.auth.loginRoute} />
      }
    />
  )
}

export default function AppRouter(this: any) {
  // const routeLocation = props.location
  useEffect((): void => {
    this.window && Analytics.page()
    this.window && window.analytics.identify()
    console.log('ALL AVAILABLE ROUTESS', path)
  })

  const isLoggedIn = Accounts.userId() !== null
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
      <Layout>
        <Switch>
          <Route path={path.auth.loginRoute} component={Login} />
          <Route path={path.auth.signupRoute} component={Signup} />
          <Route path={path.auth.logoutRoute} component={Logout} />
          <Route path={path.auth.resetPasswordRoute} component={ResetPassword} />
          <PrivateRoute path={path.onboarding} component={Onboarding} isLoggedIn={isLoggedIn} />
          <PrivateRoute path={path.profile} component={Profile} isLoggedIn={isLoggedIn} />
          <PrivateRoute path={path.account} component={Account} isLoggedIn={isLoggedIn} />
          <PrivateRoute path={path.baddie + '/:id'} component={Baddie} isLoggedIn={isLoggedIn} />
          <PrivateRoute path={path.preview} component={Preview} isLoggedIn={isLoggedIn} />

          {/* ========= Implement your Authentication Logic below  this section ======= */}
          <Route exact={true} path={path.root}>
            <App />
          </Route>
          <Route path="/auth" component={Login} />
        </Switch>
      </Layout>
    </Router>
  )
}
