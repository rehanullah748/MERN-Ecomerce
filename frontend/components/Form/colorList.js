import React from 'react'

const ColorList = ({colors, deleteColor}) => {
    console.log(colors)
  return (
    
    <div>
        {colors.length > 0 && <h2 className='mb-3'>Color List</h2>}
        {colors.length > 0 && <div className='flex flex-wrap '>
            {colors.map((item) => {
                return (
                    <div key={item.id} className='w-[30px] h-[30px] rounded-full mx-[2px] cursor-pointer' onClick={() => deleteColor(item)} style={{background: item.color}}></div>
                )
            
            })}
        </div>}

    </div>
  )
}

export default ColorList