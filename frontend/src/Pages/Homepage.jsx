import React from 'react'
import hotel from "../assets/Hotels.jpg"
import vehicle from "../assets/vehicles.jpg"
import region from "../assets/Regions.jpg"
import {  useNavigate } from 'react-router-dom'
function Homepage() {

  

  const navigate = useNavigate();
  return (
    <div className='flex gap-2 flex-col items-center'>

        <div className='flex gap-8 relative'>

          <div className='relative cursor-pointer'  onClick={()=>navigate("/hotels")}>
            <img src={hotel} alt="" className='w-[570px] h-[320px]' />
            <p className='absolute top-3 font-bold  text-3xl left-5 '>HOTELS</p>
          </div>

          <div className='relative cursor-pointer'  onClick={()=>navigate("/vehicles")}>
            <img src={vehicle} alt="" className='w-[570px] h-[320px] object-cover' />
            <p className='absolute top-3 font-bold  text-3xl left-5'>VEHICLES</p>
          </div>

        </div>

        <div className='flex gap-8 relative'>

          <div className='relative cursor-pointer'  onClick={()=>navigate("/regions")}>
            <img src={region} alt="" className='w-[570px] h-[320px] object-cover' />
            <p className='absolute top-3 font-bold  text-3xl left-5 text-white'>REGION</p>
          </div>

          <div className='relative cursor-pointer'>
            <img src="https://i0.wp.com/picjumbo.com/wp-content/uploads/amazing-stone-path-in-forest-free-image.jpg?w=600&quality=80" alt="" className='w-[570px] h-[320px] object-cover' />
            <p className='absolute top-3 font-bold  text-3xl left-5 text-white'>TREES</p>
          </div>

        </div>


    </div>
  )
}

export default Homepage
