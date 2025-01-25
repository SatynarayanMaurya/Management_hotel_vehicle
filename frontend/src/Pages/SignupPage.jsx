//  SignupPage


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLoading } from '../Redux/Slices/auth.slice';
import { apiConnector } from '../Services/apiConnector';
import { authEndpoints } from '../Services/apis';
import Spinner from '../Components/Spinner';
function SignupPage() {

    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors }} = useForm();
    const loading = useSelector((state)=>state.auth.loading)
    const dispatch = useDispatch()

    const onsubmit =async (data)=>{
      try{
        dispatch(setLoading(true));
        const result = await apiConnector("POST", authEndpoints.SIGNUP_API,data);
        dispatch(setLoading(false));
        toast.success(result?.data?.message);
        navigate("/login")
      }
      catch(error){
        dispatch(setLoading(false));
        toast.error(error?.response?.data?.message)
        return;
      }
    }

  return (
    <div className='flex lg:flex-row flex-col lg:justify-between w-10/12  lg:w-9/12 mx-auto items-center  mt-8 h-[85vh] '>
      {loading && <Spinner/>}
      <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-illustration-download-in-svg-png-gif-file-formats--select-an-account-join-the-forum-password-digital-marketing-pack-business-illustrations-8333958.png" className=' w-[500px] '  alt="" />

      <div className='lg:w-[400px] lg:mt-0 mt-4 lg:px-8 px-2 py-6 rounded-lg  flex flex-col gap-2'>

        <h1 className='text-3xl font-semibold'>Create an Account</h1>
        <p className=' font-semibold mt-2'>Enter your details below</p>

          <form action="" onSubmit={handleSubmit(onsubmit)} className='mt-6 flex flex-col gap-6'>

                <div>
                    <input type="text" {...register("name", {required:true})} name='name' id='name' placeholder='Name'  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1  w-full'/>
                    {errors.name && <p className='text-red-600'>*Name is required!</p> }
                </div>

                <div>
                    <input type="email" name='email' id='email' placeholder='Email' {...register("email",{required:true})}  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1  w-full'/>
                    {errors.email && <p className='text-red-600'>*email is required!</p>}
                </div>

                <div className='relative'>

                  <input type="text" {...register("password", {required:true})} name='password' id='password' placeholder='Password'  className=' outline-none border-b border-black border-l-none border-r-none border-t-none px-2 py-1 pr-12  w-full'/>
                  {errors.password && <p className='text-red-600'>*password is important!</p> }
                </div>

                <div className='flex justify-between items-center mt-2'>
                    <button type='submit' className='bg-[#fb641b] px-4 py-2 rounded-lg text-white cursor-pointer'>Create Account</button>
                </div>
          </form>

            <div className='flex gap-3 justify-center items-center mt-3'>
                <p>Already have account ?</p>
                <button className='text-start text-blue-600 cursor-pointer' onClick={()=>navigate("/login")}>Log in</button>
            </div>
      </div>

    </div>
  )
}

export default SignupPage

