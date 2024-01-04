import Nav from '@/components/Navebar'
import React from 'react'
import { check_auth } from '../actions'
import { redirect } from 'next/navigation'

const page = async() => {
    const auth = await check_auth()
    console.log(auth)
    if(!auth.auth) {
        redirect("/")
    }
  return (
    <div>
        <Nav auth={auth}/>
    </div>
  )
}

export default page