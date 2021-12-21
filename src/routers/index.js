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
import Exercises from './../pages/Exercises/index';
import JoinInviteClass from '../pages/JoinInviteClass';
import GradeClass from '../pages/GradeClass';
import StudentInfor from '../components/StudentInfor';

const Body = () => {
  const auth = useSelector(state => state.auth);
  const { isLogged } = auth;
  const token = localStorage.getItem('access_token')

  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={Login} exact/>
        <Route path="/signup" component={isLogged ? NotFound : SignUp} exact/>
        <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
        <Route path="/user/reset/:token" component={ResetPassword} exact/>
        <Route path="/forgot-password" component={ForgotPassword} exact/>
        <Route path="/profile" component={token ? Profile : NotFound} exact/>
        <Route path="/class/:id" component={token ? Material : NotFound} exact/>
        <Route path="/class/:id/exercises" component={Exercises} exact/>
        <Route path="/class/:id/join-student/:email/:join_token" component={JoinInviteClass} exact/>
        <Route path="/class/:id/gradeclass" component={GradeClass} exact/>
        <Route path="/class/:id/inforStudent/:studentid" component={StudentInfor} exact/>
      </Switch>
    </section>
  )
}

export default Body
