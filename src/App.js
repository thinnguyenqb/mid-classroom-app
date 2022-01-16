import React, {useEffect} from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Body from './routers/index'
import { useDispatch } from 'react-redux'
import { fetchUser } from './redux/actions/authAction'
import Drawer from './components/Drawer/Drawer'
import Alert from './components/Alert/Alert'

function App() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    dispatch(fetchUser(token))
  }, [dispatch, token]);

  return (
    <Router>
      <Drawer />
      <Alert/>
      <Body />
    </Router>
  )
}
// const getUser = async () => {
//   const res = await axios.get(`${API_URL}/user/infor`, {
//     headers: { Authorization: token },
//   });
//   dispatch({
//     type: 'AUTH',
//     payload: {
//       token: token,
//       user: res.data.user,
//       isLogged: true
//     },
//   })
//   localStorage.setItem('auth', res.data.user)
// }
// getUser()

export default App