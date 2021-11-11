import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from '../pages/Login'
import SignUp from './../pages/SignUp/index';
import Drawer from '../components/Drawer/Drawer';
import ActivationEmail from '../pages/ActivationEmail/ActivationEmail';

const Body = () => {
  return (
    <section>
      <Switch>
        <Route path="/" component={Drawer} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/signup" component={SignUp} exact/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
        
      </Switch>
      
    </section>
  )
}

export default Body
