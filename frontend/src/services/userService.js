import axios from 'axios'
import config from './config'

export async function loginUser(email,password) {
    const URL = config.BASE_URL + '/user/signin'
    const body = {email,password}
    //call the backend - use axios 
    const response = await axios.post(URL, body) //resolve promise
    return response.data
}

// export async function registerUser(email, password, role){
//     const URL = config.BASE_URL + '/user/signup'
//     const body = {email, password, role}
//     const response = await axios.post(URL, body)
//     return response.data
// }