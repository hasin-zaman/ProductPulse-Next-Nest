'use client';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation';
import { Card, CardActionArea, Divider, Paper } from '@mui/material';
import formatMessage from '@utils/formatMessage';

type Complaint = {
  complaintId: number,
  type: string,
  subject: string,
  complaintOffice: string,
  complaintAgainst: string,
  complaint: string,
  state: string,
  status: string,
  createdAt: string,
  user: {
    cnic: string,
    name: string,
    address: string,
    district: string,
    email: string,
    mobile: string,
    phone: string,
  },
  responses? : []
}

const ResponsesByComplaint = () => {
  const [complaint, setComplaint] = useState<Complaint>();

  const params = useParams();
  const router = useRouter();

  const getComplaint = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/complaints/${params.complaint}`, {headers: {Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`}});
      setComplaint(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getComplaint();
  }, []);

  return (
    <Paper elevation={3} square={false} style={{ minHeight: '90%', maxWidth: '100%', backgroundColor: 'rgb(248 250 252)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2 className='text-center font-bold text-2xl my-5'>Responses against complaint id # {complaint?.complaintId}</h2>
      <Divider />
      {complaint?.responses && complaint?.responses?.length>0 ? 
        complaint?.responses?.map((response: any) => (
            <Card key={response?.responseId} className='mx-5 mb-5 glassmorphism_light_hover cursor-pointer w-5/6' style={{padding: 0}}>
                <CardActionArea className='p-3' onClick={() => router.push(`/portal/responses/${response?.responseId}`)}>
                    <h2 className='text-center font-bold text-xl'>Response # {response?.responseId}</h2>
                    <div className='flex'>
                        <ul className='mr-3'>
                            <li className='font-bold'>response:</li>
                            <li className='font-bold'>status:</li>
                        </ul>
                        <ul>
                            <li>{formatMessage(response?.response)}</li>
                            <li>
                                <span className={`rounded-md px-4 py-px text-xs font-semibold uppercase antialiased ${response?.status=='unread' ? 'bg-orange-600/50 text-orange-900' : 'bg-green-600/50 text-green-900'}`}>
                                    {response?.status}
                                </span>
                            </li>
                        </ul>
                    </div>
                </CardActionArea>
            </Card>
        )) : 
        <h2 className='text-center font-semibold text-2xl my-5'>No responses</h2>
        }
    </Paper>
  )
}

export default ResponsesByComplaint