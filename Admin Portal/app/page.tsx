'use client';

import MUIButton from '@components/mui/muiButton';
import MUISnackbar from '@components/mui/muiSnackbar';
import axios from 'axios';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {

  const router = useRouter();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoading, setIsLoading]=useState(false);
  const [snackbarMessage, setSnackbarMessage]=useState('');
  const [snackbarColor, setSnackbarColor]=useState('');
  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    console.log(form);
  };

  const login = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
      try {
        const response=await axios.post("http://localhost:3001/auth/login", form);
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("userName", response.data.admin.userName);
        sessionStorage.setItem("role", response.data.admin.role);

        setSnackbarMessage(response.data.message);
        setSnackbarColor('success');
        setOpenSnackbar(true);
          
        router.push('/portal');
      } 
      catch (error: any) {
        setSnackbarMessage(error.response.data.message);
        setSnackbarColor('error');
        setOpenSnackbar(true);
      } 
      finally {
        setIsLoading(false);
      }
  }

  return (
    <section className='min-h-screen min-w-screen center login_background'>
      <div className='w-3/4 md:w-1/2 lg:w-1/3 min-h-screen center flex-col'>
        <div className='rounded-full bg-stone-200'>
          <Image src='/assets/images/logo.png' alt='Mohtasib Logo' width={120} height={120} className='object-contain relative right-0.5' />
        </div>
        <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={login}>
          <h1 className='font-bold text-2xl text-center text-white'>Login</h1>
          <label>
            <span className="font-satoshi font-semibold text-base text_whitesmoke">
              Username
            </span>
            <input required placeholder="Enter your username" className="form_input" name='username' value={form.username} onChange={handleChange} />
          </label>
          <label>
            <span className="font-satoshi font-semibold text-base text_whitesmoke">
              Password
            </span>
            <input type='password' required placeholder="Enter your password" className="form_input" name='password' value={form.password} onChange={handleChange} />
          </label>
          <div className="flex flex-end mx-3 mb-5 gap-4 center">
            <MUIButton type='submit' disabled={isLoading} title={isLoading ? "Logging in" : "Login"}/>
          </div>
        </form>
      </div>
      <MUISnackbar open={openSnackbar} message={snackbarMessage} severity={snackbarColor} onClose={() => setOpenSnackbar(false)}/>
    </section>
  )
}

export default Login