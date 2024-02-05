"use server"
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

export const check_auth = async () => {
    const cookieStore = cookies()
    const shopUser = cookieStore.get('shopUser')
    if(!shopUser) {
      return {auth: false, user: null}
    }
    const decoded= jwtDecode(shopUser.value)
    console.log(decoded)
    const expires_in = new Date(decoded.exp * 1000) 
    console.log(expires_in)
   if(new Date() > expires_in){
    axios.post('http://localhost:8000/api/user/user-logout', {}, {withCredentials:true})
    return {auth: false, user: null}
   }
   else {
   try {
    const {data} = await axios.get(`http://localhost:8000/api/user/user-profile?email=${decoded.email}`)
    console.log(data)
    
    return {auth: true, user: data}
   } catch (error) {
    console.log(error)
    return {auth: false, user: null}
   }

   }
  }