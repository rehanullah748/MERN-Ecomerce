import React from 'react'

const Input = ({type, placeholder, name, value, onChange, error}) => {
  return (
    <div>
        <input type={type} name= {name} value={value} onChange={onChange} placeholder= {placeholder} class="py-3 px-4 block w-full border outline-none border-gray-300 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 
        dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" />
      {error  && <span className='text-rose-600'>{error}</span> }
    </div>
    
  )
}

export default Input