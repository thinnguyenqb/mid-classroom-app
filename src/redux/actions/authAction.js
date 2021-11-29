import ACTIONS from './index'
import axios from 'axios'
import { API_URL } from '../../utils/config'


export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => { 
    const res = await axios.get(`${API_URL}/user/infor`, {
        headers: {Authorization: token} 
    })
    return res
}

export const dispatchGetUser = (res) => { 
    return{
        type: ACTIONS.GET_USER,
        payload: { 
            user: res.data
        }
    }
}  