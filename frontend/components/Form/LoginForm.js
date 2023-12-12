"use client"
import { closeModel } from '@/Store/Reducers/userReducer'
import { errorsConversion } from '@/Utils'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { useDispatch } from 'react-redux'

const LoginForm = ({setForm}) => {
  const dispatch = useDispatch()
  const [errors, setErrors] = useState([])
  const [state, setState] =useState({
    email: "",
    password: ""
  })
  const onChange = (e) => {
    console.log(e.target.value)
    setState({...state, [e.target.name]: e.target.value})
  }
  const { error, isError, isSuccess, isLoading, mutate, data} = useMutation(data => {
    return axios.post('http://localhost:8000/api/user/user-login', data)
  })
  console.log(`data = ${data}, error = ${error},`)

  const Login = (e) => {
    e.preventDefault()
    mutate({...state})
  }
  useEffect(() => {
if(isError) {
  if(error?.response?.status === 400) {
    const response = errorsConversion(error?.response?.data?.errors)
    setErrors(response)
  }
  
}
if(isSuccess) {
  toast.success("user logdIn successfully")
   dispatch(closeModel())
}

  },[isError, isSuccess])
  
  return (
    <div>
        <h3 className='text-lg font-medium text-gray-400 '>Login to your account</h3>
        <form className='mt-5' onSubmit={Login}>
       
        <input type="email" className={`mt-4 py-3 px-4 block w-full border ${errors.email ? "border-rose-600" : "border-gray-200"}  rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 outline-none`} placeholder="Your Email" name='email' value={state.email} onChange={onChange}/>
        {errors.email && <span className='text-rose-600'>{errors.email}</span>}
<div class="w-full mt-4 outline-none ">
  <div class="relative">
    <input id="hs-toggle-password" type="password" className={`border py-3 px-4 block w-full ${errors.password ? "border-rose-600" : "border-gray-200"} rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600`} placeholder="Enter password" name='password' value={state.password} onChange={onChange}/>
    {errors.password && <span className='text-rose-600'>{errors.password}</span>}
    <button type="button" data-hs-toggle-password='{
        "target": "#hs-toggle-password"
      }' class="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      <svg class="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path class="hs-password-active:hidden" d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
        <path class="hs-password-active:hidden" d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
        <path class="hs-password-active:hidden" d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
        <line class="hs-password-active:hidden" x1="2" x2="22" y1="2" y2="22"/>
        <path class="hidden hs-password-active:block" d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle class="hidden hs-password-active:block" cx="12" cy="12" r="3"/>
      </svg>
    </button>
  </div>
</div>
<input type="submit" value="sign in" class="capitalize mt-6 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800"/>
<span onClick={() => setForm("register")} className='block mt-5 text-sm font-medium text-gray-400 cursor-pointer'>Dont have an account</span>
        </form>
    </div>
  )
}

export default LoginForm