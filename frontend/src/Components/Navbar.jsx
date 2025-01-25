import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiLogOut } from "react-icons/fi";
import profile from "../assets/profile.jpeg"
import { useDispatch } from 'react-redux';
import { setToken } from '../Redux/Slices/auth.slice';


function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const logoutHandler =() =>{
        localStorage.clear();
        dispatch(setToken(null));
        navigate("/login")
    }

  return (
    <div className='h-[60px] shadow '>
      
     <div className='w-10/12 h-full mx-auto flex justify-between items-center'>

        <div onClick={()=>navigate("/")} className='cursor-pointer'>
            <img src="https://png.pngtree.com/element_our/png/20180904/management-logo-design-template-vector-png_83858.jpg" alt=""  className='w-[80px]'/>
        </div>

        <div className='flex gap-6 font-semibold '>
            
            <NavLink to="/" className={({ isActive }) => (isActive ? "text-blue-500 font-bold" : "text-gray-500 ")}  >
                Home
            </NavLink>

            <NavLink to="/hotels" className={({ isActive }) => (isActive ? "text-blue-500 font-bold" : "text-gray-500")}  >
                Hotels
            </NavLink>

            <NavLink to="/vehicles" className={({ isActive }) => (isActive ? "text-blue-500 font-bold" : "text-gray-500")}  >
                Vehicles
            </NavLink>

            <NavLink to="/regions" className={({ isActive }) => (isActive ? "text-blue-500 font-bold" : "text-gray-500")}  >
                Regions
            </NavLink>

        </div>

        <div className='flex gap-8 items-center'>
            {/* <p className='text-2xl  '><CgProfile/></p> */}
            <img src={profile} alt="" className='w-[35px] h-[35px] rounded-full' />
            <div className="relative group inline-block">
                <p className=' p-2 text-lg cursor-pointer bg-gray-200 rounded-full hover:bg-gray-300'  onClick={()=>logoutHandler()}><FiLogOut/></p>
                <p className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 text-white text-sm py-1 px-2 rounded hidden group-hover:block">Logout</p>
            </div>
        </div>

    </div>
    </div>
  )
}

export default Navbar
