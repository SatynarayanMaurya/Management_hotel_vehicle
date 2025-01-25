import React, { useEffect, useState } from 'react'
import { GiSkullCrossedBones } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/Slices/auth.slice';
import { apiConnector } from '../Services/apiConnector';
import { hotelEndpoints } from '../Services/apis';
import Spinner from '../Components/Spinner';


function Hotels() {
  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false);
  const loading = useSelector((state)=>state.auth.loading)
  const token = useSelector((state)=>state.auth.token)
  const [hotels, setHotels] = useState([])
  const [hotelId, setHotelId] = useState("")
  const [deleteHotel, setDeleteHotel] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const {register:register1,handleSubmit:handleSubmitForm1,formState: { errors:errors1 }} = useForm();
  const {register:register2,handleSubmit:handleSubmitForm2} = useForm();

  const modal = ()=>{
    setOpenModal(!openModal)
  }

  const editModalHandler = (hotelId)=>{
    setEditModal(!editModal)
    setHotelId(hotelId)
  }


  // get all hotels 
  const getAllHotels =async ()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("GET", hotelEndpoints.GET_ALL_HOTELS_API,{},{Authorization:`Bearer ${token}`})
      setHotels(result?.data?.hotels)
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      if(error?.response?.data?.message === "Invalid Token"){
        toast.error("Session Expired login again");
        navigate("/login");
        return;
      }
      toast.error(error?.response?.data?.message);
      return;
    }
  }

  useEffect(()=>{
    getAllHotels()
  },[token,openModal,editModal,deleteHotel])



  // Add Hotel 
  const addHotelHandler = async (data)=>{
    try{
      dispatch(setLoading(true));
      const result = await apiConnector("POST", hotelEndpoints.ADD_HOTEL_API,data ,{Authorization:`Bearer ${token}`})
      toast.success(result?.data?.message)
      dispatch(setLoading(false))
      modal()
    }
    catch(error){
      dispatch(setLoading(false));
      toast.error(error?.response?.data?.message)
      return 
    }
  }

  // Edit hotel 
  const editHotelHandler =async (data)=>{
    try{
      if(data.hotelName.trim() == "" && data.price.trim() == "" && data.address.trim() == "" && data.region.trim() == "" ){
        alert("Provide atleast one field to be update")
        return ;
      }
      dispatch(setLoading(true))
      data.hotelId = hotelId
      const result = await apiConnector("PUT", hotelEndpoints.UPDATE_HOTEL_API,data,{Authorization:`Bearer ${token}`})
      dispatch(setLoading(false))
      toast.success(result?.data?.message);
      editModalHandler();

    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
    
  }

  const deleteHotelHandler = async(hotelId)=>{
    try{
        dispatch(setLoading(true))
        const result = await apiConnector("DELETE", hotelEndpoints.DELETE_HOTEL_API,{hotelId:hotelId}, {Authorization:`Bearer ${token}`})
        toast.success(result?.data?.message)
        dispatch(setLoading(false))
        setDeleteHotel(!deleteHotel);
    }
    catch(error){
      dispatch(setLoading(false));
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  return (
    <div className='flex flex-col gap-2'>
        {loading && <Spinner/>}
        <div className='h-[60px]  flex justify-end items-center  '>
          <button onClick={modal} className='cursor-pointer bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg'>Add Hotel</button>
        </div>

        <div className='flex justify-between border  py-4 items-center px-6 font-semibold'>
          <p className=' w-[20%]'>Hotel Name</p>
          <p className=' w-[10%]'>Price</p>
          <p className=' w-[30%]'>Address</p>
          <p className=' w-[15%]'>Region</p>
          <p className=' w-[8%]'>Action</p>
        </div>

        <div className='border mt-6'>

          {
            hotels?.length <= 0 ? <div className='font-semibold text-center mt4'>No Hotels</div> :
            hotels.map((hotel)=>{
              return  <div key={hotel._id} className='flex justify-between py-4 items-center px-6 border-b border-[#c5c5c5]'>
                        <p className=' w-[20%]'>{hotel?.hotelName}</p>
                        <p className=' w-[10%]'>{hotel.price}</p>
                        <p className='  w-[30%]'>{hotel?.address}</p>
                        <p className='  w-[15%]'>{hotel?.region}</p>
                        <div className='w-[8%] flex gap-8 text-2xl'>
                          <p onClick={()=>editModalHandler(hotel?._id)} className='cursor-pointer'><CiEdit/></p>
                          <p onClick={()=>deleteHotelHandler(hotel?._id)} className='cursor-pointer'><MdOutlineDelete/></p>
                        </div>
                      </div>
            })
          }


        </div>



        {/* Add Hotel  */}
        {
          openModal &&

          <div className=' fixed inset-0  bg-opacity-55 backdrop-blur-xs  flex items-center justify-center'>
            <div className='bg-white border border-black min-h-[510px]  max-h-[600px] w-[450px]  px-6 py-2 rounded-2xl'>
                <div className='flex justify-between items-center mt-4'>
                  <h1 className='text-3xl font-semibold  '>Hotel Details</h1>
                  <p  onClick={modal} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                </div>
                
                <form onSubmit={handleSubmitForm1(addHotelHandler)} className='mt-5 flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Hotel Name* </label>
                      <input {...register1('hotelName',{required:true})} type="text" placeholder='Hotel Name' className='border px-4 py-2 rounded-lg outline-none' />
                      {errors1.hotelName && <p className='text-red-500 -mt-2'>*hotel Name is important</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Price* </label>
                      <input {...register1('price',{required:true})}  type="text" placeholder='Price' className='border px-4 py-2 rounded-lg outline-none' />
                      {errors1.price && <p className='text-red-500 -mt-2'>*hotel Name is important</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Address* </label>
                      <input type="text" {...register1('address',{required:true})}  placeholder='Address' className='border px-4 py-2 rounded-lg outline-none' />
                      {errors1.address && <p className='text-red-500 -mt-2'>*hotel Name is important</p>}
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Region* </label>
                      <input type="text" {...register1('region',{required:true})}  placeholder='Region' className='border px-4 py-2 rounded-lg outline-none' />
                      {errors1.region && <p className='text-red-500 -mt-2'>*hotel Name is important</p>}
                    </div>

                    <button type="submit" className='bg-blue-400 cursor-pointer  text-white font-semibold px-4 py-2 rounded-lg'>Submit</button>
                </form>
            </div>
          </div>
        }



        {/* Edit hotel  */}
        {
          editModal &&

          <div className=' fixed inset-0  bg-opacity-55 backdrop-blur-xs  flex items-center justify-center'>
            <div className='bg-white border border-black min-h-[510px]  max-h-[600px] w-[450px]  px-6 py-2 rounded-2xl'>
                <div className='flex justify-between items-center mt-4'>
                  <h1 className='text-3xl font-semibold  '>Edit Hotel Details</h1>
                  <p  onClick={editModalHandler} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                </div>
                
                <form onSubmit={handleSubmitForm2(editHotelHandler)} className='mt-5 flex flex-col gap-4'>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Hotel Name* </label>
                      <input {...register2('hotelName')} type="text" placeholder='Hotel Name' className='border px-4 py-2 rounded-lg outline-none' />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Price* </label>
                      <input {...register2('price')}  type="text" placeholder='Price' className='border px-4 py-2 rounded-lg outline-none' />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Address* </label>
                      <input type="text" {...register2('address')}  placeholder='Address' className='border px-4 py-2 rounded-lg outline-none' />
                    </div>

                    <div className='flex flex-col gap-2'>
                      <label htmlFor="">Region* </label>
                      <input type="text" {...register2('region')}  placeholder='Region' className='border px-4 py-2 rounded-lg outline-none' />
                    </div>

                    <button type="submit" className='bg-blue-400 cursor-pointer  text-white font-semibold px-4 py-2 rounded-lg'>Submit</button>
                </form>
            </div>
          </div>
        }


    </div>
  )
}

export default Hotels
