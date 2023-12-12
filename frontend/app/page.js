import Header from '@/components/Header'
import HomeProducts from '@/components/Home/HomeProducts'
import Nav from '@/components/Navebar'
import { jwtDecode } from 'jwt-decode'
import { cookies } from 'next/headers'

export default function Home() {
  const cookieStore = cookies()
 console.log(cookieStore)
  const shopUser = cookieStore.get('shopUser')
  console.log(shopUser)
  // const token = jwtDecode(shopUser.value)
  // console.log(token)
  return (
    <>
      <Nav/> 
      <Header/>
      <HomeProducts/>
      
    </>
     
  )
}
