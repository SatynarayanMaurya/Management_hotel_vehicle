import React, { useEffect, useState } from 'react'
import { GiSkullCrossedBones } from "react-icons/gi";
import { useForm } from 'react-hook-form';
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../Redux/Slices/auth.slice';
import { toast } from 'react-toastify';
import { apiConnector } from '../Services/apiConnector';
import { regionEndpoints } from '../Services/apis';
import Spinner from '../Components/Spinner';

function RegionPage() {

  const [openModal, setOpenModal] = useState(false)
  const [editModal, setEditModal] = useState(false);
  const loading = useSelector((state)=>state.auth.loading)
  const token = useSelector((state)=>state.auth.token)
  const {register:register1,handleSubmit:handleSubmitForm1,formState: { errors:errors1 }} = useForm();
  const {register:register2,handleSubmit:handleSubmitForm2} = useForm();
  const [regionId, setRegionId] = useState("")
  const [deleteRegion, setDeleteRegion] = useState(false)
  const [regions, setRegions] = useState([]);
  const dispatch = useDispatch()

  const editModalHandler = (regionId)=>{
    setEditModal(!editModal)
    setRegionId(regionId)
  }

  const modal = ()=>{
    setOpenModal(!openModal)
  }

  // Get All regions
  const getAllRegions = async()=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("GET", regionEndpoints.GET_ALL_REGION_API,{},{Authorization:`Bearer ${token}`})
      setRegions(result?.data?.allRegions)
      dispatch(setLoading(false))
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message);
      return ;
    }
  }

  useEffect(()=>{
    getAllRegions()
  },[openModal,editModal, deleteRegion])

  // Add Region 
  const addRegionHandler =async (data)=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("POST", regionEndpoints.ADD_REGION_API,data,{Authorization:`Bearer ${token}`})
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
  const editRegionHandler =async (data)=>{
    try{
      if(data.regionName.trim() == "" && data.subRegion.trim() == "" ){
        alert("Provide atleast one field to be update")
        return ;
      }
      data.regionId = regionId;
      dispatch(setLoading(true))
      const result = await apiConnector("PUT", regionEndpoints.UPDATE_REGION_API,data,{Authorization:`Bearer ${token}`})
      toast.success(result?.data?.message)
      dispatch(setLoading(false))
      editModalHandler()
    }
    catch(error){
      dispatch(setLoading(false))
      toast.error(error?.response?.data?.message)
      return ;
    }
  }

  const deleteRegionHandler = async (regionId)=>{
    try{
      dispatch(setLoading(true))
      const result = await apiConnector("DELETE", regionEndpoints.DELETE_REGION_API,{regionId:regionId}, {Authorization:`Bearer ${token}`})
      toast.success(result?.data?.message)
      dispatch(setLoading(false))
      setDeleteRegion(!deleteRegion)
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
              <button onClick={modal} className='cursor-pointer bg-yellow-300 text-black font-semibold px-4 py-2 rounded-lg'>Add Region</button>
            </div>
    
            <div className='flex justify-between border  py-4 items-center px-6 font-semibold'>
              <p className=' w-[35%]'>Regions</p>
              <p className=' w-[45%]'>Sub-Region</p>
              <p className=' w-[10%]'>Action</p>
            </div>

            {/* all Regions  */}
            <div className='border mt-6'>
    
              {
                regions.length <= 0 ? <div>No Regions available</div>:
                regions.map((region)=>{
                  return  <div key={region?._id} className='flex justify-between py-4 items-center px-6 border-b border-[#c5c5c5]'>
                            <p className=' w-[35%]'>{region?.regionName}</p>
                            <p className='  w-[45%]'>{region?.subRegion}</p>
                            <div className='w-[10%] flex gap-8 text-2xl'>
                              <p onClick={()=>editModalHandler(region?._id)} className='cursor-pointer'><CiEdit/></p>
                              <p onClick={()=>deleteRegionHandler(region?._id)} className='cursor-pointer'><MdOutlineDelete/></p>
                            </div>
                          </div>
                })
              }
    
            </div>
    
    
    
            {/* Add Hotel  */}
            {
              openModal &&
    
              <div className=' fixed inset-0  bg-opacity-55 backdrop-blur-xs  flex items-center justify-center'>
                <div className='bg-white border border-black min-h-[370px]  max-h-[400px] w-[450px]  px-6 py-2 rounded-2xl'>
                    <div className='flex justify-between items-center mt-4'>
                      <h1 className='text-3xl font-semibold  '>Region Details</h1>
                      <p  onClick={modal} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                    </div>
                    
                    <form onSubmit={handleSubmitForm1(addRegionHandler)} className='mt-5 flex flex-col gap-4'>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Region Name* </label>
                          <input {...register1('regionName',{required:true})} type="text" placeholder='Region Name' className='border px-4 py-2 rounded-lg outline-none' />
                          {errors1.regionName && <p className='text-red-500 -mt-2'>*Region Name is important</p>}
                        </div>
    
    
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Sub-Region* </label>
                          <input type="text" {...register1('subRegion',{required:true})}  placeholder='United States, Canada, Mexico' className='border px-4 py-2 rounded-lg outline-none' />
                          {errors1.subRegion && <p className='text-red-500 -mt-2'>*Sub-Region is important</p>}
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
                <div className='bg-white border border-black  min-h-[370px]  max-h-[400px] w-[450px]  px-6 py-2 rounded-2xl'>
                    <div className='flex justify-between items-center mt-4'>
                      <h1 className='text-3xl font-semibold  '>Edit Region Details</h1>
                      <p  onClick={editModalHandler} className='text-2xl cursor-pointer'><GiSkullCrossedBones/></p>
                    </div>
                    
                    <form onSubmit={handleSubmitForm2(editRegionHandler)} className='mt-5 flex flex-col gap-4'>
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Region Name* </label>
                          <input {...register2('regionName')} type="text" placeholder='Region Name' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>
    
    
                        <div className='flex flex-col gap-2'>
                          <label htmlFor="">Sub-Region* </label>
                          <input type="text" {...register2('subRegion')}  placeholder='United States, Canada, Mexico' className='border px-4 py-2 rounded-lg outline-none' />
                        </div>
    
                        <button type="submit" className='bg-blue-400 cursor-pointer  text-white font-semibold px-4 py-2 rounded-lg'>Submit</button>
                    </form>
                </div>
              </div>
            }
    
    
        </div>
  )
}

export default RegionPage
