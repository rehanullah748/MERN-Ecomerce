import React, { useState } from 'react'

const Checkbox = ({checked, onChange, checkError}) => {
 
  return (
    <>
   <div>
    <h1 className='mb-3'>Sizes</h1>
 <div class="flex gap-x-4 flex-wrap ">
  
  <div class="flex">
    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="small" name='small' value={checked.small} onChange={onChange}/>
    <label for="hs-checkbox-group-1" class="text-sm text-gray-500 ml-3 dark:text-gray-400">small</label>
  </div>

  <div class="flex">
    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="extra small" name='extrasmall' value={checked.extrasmall} onChange={onChange}/>
    <label for="hs-checkbox-group-2" class="text-sm text-gray-500 ml-3 dark:text-gray-400">extra small</label>
  </div>

  <div class="flex">
    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="medium" name='medium' value={checked.medium} onChange={onChange}/>
    <label for="hs-checkbox-group-3" class="text-sm text-gray-500 ml-3 dark:text-gray-400">medium</label>
  </div>
  
  <div class="flex">
    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="large" name='large' value={checked.large} onChange={onChange} />
    <label for="hs-checkbox-group-4" class="text-sm text-gray-500 ml-3 dark:text-gray-400">Large</label>
  </div>

  <div class="flex">
    <input type="checkbox" class="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="extra large" name='extralarge' value={checked.extralarge} onChange={onChange} />
    <label for="hs-checkbox-group-5" class="text-sm text-gray-500 ml-3 dark:text-gray-400">extra large</label>
  </div>
  </div>
  </div>
</> 
  )
}
export default Checkbox;