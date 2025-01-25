import React, { useEffect, useState } from 'react'
import { GiSkullCrossedBones } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLoading } from '../Redux/Slices/auth.slice';
import Spinner from '../Components/Spinner';
import { apiConnector } from '../Services/apiConnector';
import { vehicleEndpoints } from '../Services/apis';

function VehiclesPage() {

  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false);
  const {register:register1,handleSubmit:handleSubmitForm1,formState: { errors:errors1 }} = useForm();
  const {register:register2,handleSubmit:handleSubmitForm2} = useForm();
  const loading = useSelector((state)=>state.auth.loading)
  const token = useSelector((state)=>state.auth.token)
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId,setVehicleId] = useState("")
  const [deleteVehicle, setDeleteVehicle] = useState(false)
  const dispatch = useDispatch()

  const editModalHandler = (vehicleId)=>{
    setEditModal(!editModal)
    setVehicleId(vehicleId)
  }

  const modal = ()=>{
    setOpenModal(!openModal)
  }

  // Getting all vehicle details
  const getAllVehicles = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("GET", vehicleEndpoints.GET_ALL_VEHICLES_API,{},{Authorization:`Bearer ${token}`}) 
      setVehicles(result?.data?.vehicles)
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  useEffect(()=>{
    getAllVehicles()
  },[openModal, editModal,deleteVehicle])
 
  // Add vehicle 
  const addVehicleHandler = async(data)=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("POST", vehicleEndpoints.ADD_VEHICLE_API,data,{Authorization:`Bearer ${token}`})
      toast.success(result?.data?.message)
      dispatch(setLoading(false))
      modal();
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  // Edit Vehicle 
  const editVehicleHandler = async(data)=>{
    try{
      if(data.vehicleName.trim() == "" && data.price.trim() == "" && data.type.trim() == "" && data.region.trim() == "" ){
        alert("Provide atleast one field to be update")
        return ;
      }
      data.vehicleId = vehicleId;
      dispatch(setLoading(true))
      const result = await  apiConnector("PUT", vehicleEndpoints.UPDATE_VEHICLE_API,data,{Authorization:`Bearer ${token}`})
      toast.success(result?.data?.message);
      dispatch(setLoading(false))
      editModalHandler()
    }
    catch(error){
      dispatch(setLoading(false));
      toast.error(error?.response?.data?.message)
      return;
    }
  }

  const deleteVehicleHandler = async(vehicleId)=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("DELETE", vehicleEndpoints.DELETE_VEHICLE_API,{vehicleId:vehicleId},{Authorization:`Bearer ${token}`})
      toast.success(result?.data?.message)
      dispatch(setLoading(false))
      setDeleteVehicle(!deleteVehicle)
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }


  return (


        <div className='flex flex-col gap-2'>

            {loading && <Spinner/>}

            <div className='h-[60px]  flex justify-end items-center  '>
              <button onClick={modal} className='cursor-pointer bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg'>Add Vehicle</button>
            </div>
    
            <div className='flex justify-between border  py-4 items-center px-6 font-semibold'>
              <p className=' w-[20%]'>Vehicle Name</p>
              <p className=' w-[20%]'>Type</p>
              <p className=' w-[10%]'>Price</p>
              <p className=' w-[15%]'>Region</p>
              <p className=' w-[8%]'>Action</p>
            </div>

            {/* All Vehicles  */}
            <div className='border mt-6'>
              
              {
                vehicles.length <= 0 ? <div></div> :
                vehicles.map((vehicle)=>{
                  return  <div key={vehicle?._id} className='flex justify-between py-4 items-center px-6 border-b border-[#c5c5c5]'>
                            <p className=' w-[20%]'>{vehicle?.vehicleName}</p>
                            <p className='  w-[20%]'>{vehicle?.type}</p>
                            <p className=' w-[10%]'>{vehicle?.price}</p>
                            <p className='  w-[15%]'>{vehicle?.region}</p>
                            <div className='w-[8%] flex gap-8 text-2xl'>
                              <p onClick={()=>editModalHandler(vehicle?._id)} className='cursor-pointer'><CiEdit/></p>
                              <p onClick={()=>deleteVehicleHandler(vehicle?._id)} className='cursor-pointer'><MdOutlineDelete/></p>
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
                      <h1 className='text-3xl font-semibold  '>Vehicle Details</h1>
                      <p  onClick={modal} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                    </div>
                    
                    <form onSubmit={handleSubmitForm1(addVehicleHandler)} className='mt-5 flex flex-col gap-4'>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Vehicle Name* </label>
                          <input {...register1('vehicleName',{required:true})} type="text" placeholder='Vehicle Name' className='border px-4 py-2 rounded-lg outline-none' />
                          {errors1.vehicleName && <p className='text-red-500 -mt-2'>*vehicle Name is important</p>}
                        </div>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Type* </label>
                          <input type="text" {...register1('type',{required:true})}  placeholder='SUV, Electric, Truck etc' className='border px-4 py-2 rounded-lg outline-none' />
                          {errors1.type && <p className='text-red-500 -mt-2'>*Vehicle type is important</p>}
                        </div>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Price* </label>
                          <input {...register1('price',{required:true})}  type="text" placeholder='Price' className='border px-4 py-2 rounded-lg outline-none' />
                          {errors1.price && <p className='text-red-500 -mt-2'>*vehicle Name is important</p>}
                        </div>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Region* </label>
                          <input type="text" {...register1('region',{required:true})}  placeholder='Region' className='border px-4 py-2 rounded-lg outline-none' />
                          {errors1.region && <p className='text-red-500 -mt-2'>*Region is important</p>}
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
                      <h1 className='text-3xl font-semibold  '>Edit Vehicle Details</h1>
                      <p  onClick={editModalHandler} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                    </div>
                    
                    <form onSubmit={handleSubmitForm2(editVehicleHandler)} className='mt-5 flex flex-col gap-4'>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Vehicle Name* </label>
                          <input {...register2('vehicleName')} type="text" placeholder='Vehicle Name' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>
    
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Type* </label>
                          <input type="text" {...register2('type')}  placeholder='SUV, Electric, Truck etc' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>

                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Price* </label>
                          <input {...register2('price')}  type="text" placeholder='Price' className='border px-4 py-2 rounded-lg outline-none' />
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

export default VehiclesPage
