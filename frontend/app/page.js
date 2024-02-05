import Header from '@/components/Header'
import HomeProducts from '@/components/Home/HomeProducts'
import Nav from '@/components/Navebar'
import { check_auth } from './actions'
import CartModel from '@/components/Models/CartModel'
export const metadata = {
  title: 'Chowk Bazar',
  description: 'ecomerce website',
}
export default async function Home() {
  const auth =await check_auth()
  console.log(auth)
 
  return (
    <>
      
      <Nav auth={auth}/>
      <Header/>
      <HomeProducts/>
      
    </>
     
  )
}
