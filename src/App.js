import React from 'react'
import { Drawer } from './components';
import { Login } from './pages';
import { ForgotPassword } from './pages';
import { ResetPassword } from './pages';
import { SignUp } from './pages';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Drawer />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      <Route path="/reset-password">
        <ResetPassword />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
    </Switch>
  </Router>
  )
}

export default App