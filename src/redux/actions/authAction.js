import { GLOBALTYPES } from "./globalTypes";
import axios from "axios";
import valid from '../../utils/valid'
import { API_URL } from "../../utils/config";

export const TYPES = {
  AUTH: "AUTH",
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    const res = await axios.post(`${API_URL}/user/login`, data,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
        isLogged: true,
      },
    });
    localStorage.setItem('access_token', res.data.access_token);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
    //if(res.data.access_token) setTimeout(function(){window.location.href = "/"} , 2000);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
};

export const loginGoogle = (data) => async (dispatch) => {
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: {loading: true}})
    const res = await axios.post(`${API_URL}/user/google_login`, data,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
        isLogged: true,
      },
    });
    localStorage.setItem('access_token', res.data.access_token);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
    if(res.data.access_token) window.location.href = "/"
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
};

export const fetchUser = (token) => async (dispatch) => {
  if (token) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } })
    try {
      const res = await axios.get(`${API_URL}/user/infor`, {
        headers: { Authorization: token },
      });
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: token,
          user: res.data.user,
          isLogged: true
        },
      });
      dispatch({type: GLOBALTYPES.ALERT, payload: {}})
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg
        }
      })
    }
  }
};

export const register = (data) => async(dispatch) => {
  const check = valid(data) //function
  console.log(check)
  if(check.errMsg)
    return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: check.errMsg }}) // redux
  
  try {
    //action loading
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})

    const res = await axios.post(`${API_URL}/user/register`, {
      name: data.name,
      fullname: data.fullname,
      email: data.email,
      password: data.password
    },
    {
      headers: {
        'Content-Type': 'application/json',
      }
    })
   
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
    if(res.data.access_token) window.location.href = "/login"
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const activationEmail = (activation_token) => async(dispatch) => {
  try {
    //action loading
    dispatch({type: GLOBALTYPES.ALERT, payload: {loading: true}})
   
    const res = await axios.post(`${API_URL}/user/activation`, { activation_token }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
  
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg
      }
    })
    if (res.status === 200)
    setTimeout(function(){window.location.href = "/login"} , 5000);
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}

export const logout = () => async(dispatch) => {
  try {
    //action loading
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {},
    });
    localStorage.removeItem('access_token')
  
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: "Logout successful!"
      }
    })
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg
      }
    })
  }
}