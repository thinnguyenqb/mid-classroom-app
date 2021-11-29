import React, {useEffect} from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Body from './routers/index'
import { useDispatch } from 'react-redux'
import { dispatchLogin, fetchUser, dispatchGetUser } from './redux/actions/authAction'
import Drawer from './components/Drawer/Drawer'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchUser(token).then((res) => {
          dispatch(dispatchGetUser(res));
        });
      };
      getUser();
      dispatch({type: 'GET_TOKEN', payload: token})
    }
  }, [token, dispatch]);

  return (
    <Router>
      <Drawer />
      <Body />
  </Router>
  )
}

export default App