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
import GradeReview from '../pages/GradeReview';
import StudentInfor from '../components/StudentInfor';
import ReviewPoint from '../pages/ReviewPoint';

const Body = () => {
  const auth = useSelector(state => state.auth);
  const token = localStorage.getItem('access_token')

  return (
    <section>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/login" component={auth.token ? NotFound : Login} exact/>
        <Route path="/signup" component={auth.token ? NotFound : SignUp} exact/>
        <Route path="/user/activate/:activation_token" component={token ? NotFound : ActivationEmail} exact/>
        <Route path="/user/reset/:token" component={auth.token ? NotFound : ResetPassword} exact/>
        <Route path="/forgot-password" component={auth.token ? NotFound : ForgotPassword} exact/>
        <Route path="/profile" component={auth.token && Profile} exact/>
        <Route path="/class/:id" component={auth.token && Material } exact/>
        <Route path="/class/:id/exercises" component={Exercises} exact/>
        <Route path="/class/:id/join-student/:email/:join_token" component={JoinInviteClass} exact/>
        <Route path="/class/:id/gradeclass" component={GradeClass} exact/>
        <Route path="/class/:id/gradeclass/gradereview" component={GradeReview} exact/>
        <Route path="/class/:id/inforStudent/:studentid" component={StudentInfor} exact/>
        <Route path="/class/:id/gradeclass/:exerciseid/:studentid" component={ReviewPoint} exact/>
      </Switch>
    </section>
  )
}

export default Body
