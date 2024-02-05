'use client'
import { useEffect, useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'
import { Provider } from 'react-redux'
import { store } from '@/Store'
import AuthModel from '@/components/Models/AuthModel'
import CartModel from '@/components/Models/CartModel'

const inter = Inter({ subsets: ['latin'] })

const queryClient = new QueryClient()
export default function RootLayout({ children }) {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    import('preline')
  }, [])
  // if (!mounted) {
  //   return <>
  //   </>;
  // }
  return (
    
    <html lang="en">
      <body className={inter.className}>
      <NextTopLoader />
        <Provider store={store}>
        <NextTopLoader />
      <Toaster toastOptions={{duration: 9000}}
  position="top-right"
  reverseOrder={false}
/>
        <QueryClientProvider client={queryClient}>
          <AuthModel/>
          <CartModel/>
          {children} 
        </QueryClientProvider>
        </Provider>
      </body>
    </html>
   
  )
}
