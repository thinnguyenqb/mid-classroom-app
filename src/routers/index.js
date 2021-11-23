import React from 'react'
import { Switch, Route } from "react-router-dom";
import Login from '../pages/Login'
import SignUp from './../pages/SignUp/index';
import Home from '../pages/Home';
import ActivationEmail from '../pages/ActivationEmail/ActivationEmail';
import NotFound from '../pages/NotFound';
import { useSelector } from 'react-redux';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from './../pages/ResetPassword/index';
import Profile from '../pages/Profile'
import Material from '../pages/Material'
import UserProfile from '../pages/UserProfile';

const Body = () => {
  const auth = useSelector(state => state.auth);
  const { isLogged } = auth;

  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={isLogged ? NotFound : Login} exact/>
        <Route path="/signup" component={isLogged ? NotFound : SignUp} exact/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
        <Route path="/user/reset/:token" component={ResetPassword} exact/>
        <Route path="/forgot-password" component={ForgotPassword} exact/>
        <Route path="/profile" component={Profile} exact/>
        <Route path="/class/:id" component={Material} exact/>
        <Route path="/profile" component={Profile} exact/>
      </Switch>
    </section>
  )
}

export default Body
