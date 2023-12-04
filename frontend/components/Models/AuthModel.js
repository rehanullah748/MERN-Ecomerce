import { motion } from "framer-motion"
import { useState } from 'react'
import RegisterForm from '../Form/RegisterForm'
import LoginForm from '../Form/LoginForm'

const AuthModel = () => {
    const [form, setForm] = useState("register")
  return (
    <div className='flex items-center justify-center fixed inset-0 bg-black/40 w-full h-full z-[99999] px-7 py-8'>
        <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }} className='bg-white w-full lg:w-4/12 rounded-lg p-6'>
            {form === "register" ? <RegisterForm setForm={setForm}/> : form === "login" ? <LoginForm setForm={setForm}/> : ""} 
        </motion.div>

    </div>
  )
}

export default AuthModel