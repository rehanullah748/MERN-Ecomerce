"use client"
import { motion } from "framer-motion"
import { useState } from 'react'
import RegisterForm from '../Form/RegisterForm'
import LoginForm from '../Form/LoginForm'
import { useDispatch, useSelector } from "react-redux"
import { IoClose } from "react-icons/io5"
import { closeModel } from "@/Store/Reducers/userReducer"

const AuthModel = () => {
    const [form, setForm] = useState("register")
    const { model } = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()
    
    console.log(model)
  return model ? (
    <div className='  flex items-center justify-center fixed inset-0 bg-black/40 w-full h-full z-[99999] px-7 py-8'>
      <div className="absolute top-2 right-2 text-white text-lg cursor-pointer" onClick={() => dispatch(closeModel())}><IoClose /></div>
        <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }} className='bg-white w-full lg:w-4/12 rounded-lg px-6 pb-6 pt-12'>

            {form === "register" ? <RegisterForm setForm={setForm}/> : form === "login" ? <LoginForm setForm={setForm}/> : ""}
             
        </motion.div>

    </div>
  ) : ""
}

export default AuthModel