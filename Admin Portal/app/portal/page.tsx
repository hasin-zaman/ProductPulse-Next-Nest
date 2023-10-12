'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';

type ComplaintDetails = {
  totalComplaints: number,
  totalGeneralComplaints: number,
  totalChildRelatedComplaints: number,
  totalUnreadComplaints: number,
  totalInProcessComplaints: number,
  totalResolvedComplaints: number,
  totalNewComplaints: number,
  totalPendingComplaints: number,
  totalCriticalComplaints: number
}

type UserDetails = {
  totalUsers: number
}

const Portal = () => {
  const [complaintDetails, setComplaintDetails] = useState<ComplaintDetails>();
  const [userDetails, setUserDetails] = useState<UserDetails>();

  const getComplaintDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3001/complaints/details', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setComplaintDetails(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getUserDetails = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users/details', {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setUserDetails(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }
    
  useEffect(() => {
    getComplaintDetails();
    getUserDetails();
  }, []);

  return (
    <div className='center flex-wrap gap-5'>
      <div className='bg-stone-300 w-96 h-64 rounded-2xl'>
        <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
          <h2 className='font-semibold font-sans text-2xl'>Complaints Registered</h2>
          <h2 className='text-center font-semibold text-8xl my-auto'>{complaintDetails?.totalComplaints}</h2>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-blue-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>General Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalGeneralComplaints}</h2>
          </div>
        </div>
        <div className='bg-purple-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Child Related Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalChildRelatedComplaints}</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-yellow-500 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Unread Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalUnreadComplaints}</h2>
          </div>
        </div>
        <div className='bg-yellow-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>In Process Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalInProcessComplaints}</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-yellow-200 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Resolved Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalResolvedComplaints}</h2>
          </div>
        </div>
        <div className='bg-red-200 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>New Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalNewComplaints}</h2>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-7'>
        <div className='bg-red-300 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Pending Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalPendingComplaints}</h2>
          </div>
        </div>
        <div className='bg-red-500 w-80 h-28 rounded-2xl'>
          <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
            <h2 className='font-semibold font-sans text-xl'>Critical Complaints</h2>
            <h2 className='text-center font-semibold text-5xl my-auto'>{complaintDetails?.totalCriticalComplaints}</h2>
          </div>
        </div>
      </div>
      <div className='bg-gray-300 w-96 h-64 rounded-2xl'>
        <div className='w-full h-full glassmorphism_light flex flex-col justify-between p-5'>
          <h2 className='font-semibold font-sans text-2xl'>Users Registered</h2>
          <h2 className='text-center font-semibold text-8xl my-auto'>{userDetails?.totalUsers}</h2>
        </div>
      </div>
    </div>
  )
}

export default Portal