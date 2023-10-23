'use client'
import { useEffect, useState } from 'react'
import './globals.css'
import { Inter } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Toaster } from 'react-hot-toast'
import NextTopLoader from 'nextjs-toploader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}
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
      <Toaster toastOptions={{duration: 9000}}
  position="top-right"
  reverseOrder={false}
/>
        <QueryClientProvider client={queryClient}>
          {children} 
        </QueryClientProvider></body>
    </html>
   
  )
}
