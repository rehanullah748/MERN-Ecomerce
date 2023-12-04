import React from 'react'

const LoginForm = ({setForm}) => {
  return (
    <div>
        <h3 className='text-lg font-medium text-gray-400 '>Login to your account</h3>
        <form className='mt-5'>
       
        <input type="email" class="mt-4 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-gray-500 focus:ring-gray-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600 outline-none" placeholder="Your Email"/>
<div class="w-full mt-4 outline-none ">
  <div class="relative">
    <input id="hs-toggle-password" type="password" class="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" placeholder="Enter password" value=""/>
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