import React from 'react'
import { Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import dailybooks from '../../images/dailybooks2.svg'
import dailybooks_logo from '../../images/download (1).png'


const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};


function Signup() {
  const navigate = useNavigate();

  const handleOpenSignin = (item) => {
    navigate(`/`)
  }


  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  console.log(errors)

  const onSubmit = async (data) => {
    console.log('get the backend data', data)
    reset();
  };

  return (
    <div className=' bg-[#FFFFFF] flex items-center flex-col mx-4 sm:mb-8'>
      <div className='mt-3 sm:mt-3 w-52 sm:w-56'><img src={dailybooks_logo} alt='logo_jpg' /></div>
      <p className='font-bold sm:text-2xl sm:font-bold text-base sm:mt-2'>SaaS Business & Accounting Software</p>
      <p className='mt-2 sm:mt-2 text-sm sm:text-base'> <span className='font-medium text-sm sm:text-base'>DailyBooks</span> helps Entrepreneurs to manage their business & finances</p>



      <div className='flex sm:mt-12'>
        {/* ===========upload image========= */}
        <div className='hidden sm:block sm:mr-44'>
          <img src={dailybooks} alt='dailybooks.jpg' width='550px' />

        </div>
        {/* ================here Singup from======= */}
        <div>
          <form className="bg-[#FFFFFF] rounded-lg flex items-center justify-center flex-col sm:ml-5 sm:drop-shadow-lg sm:p-6" onSubmit={handleSubmit(onSubmit)}>
            <p className='mb-3 font-bold text-base sm:font-bold'>Sign Up</p>
            <div className="mb-3 sm:mb-5">
              <input className={`block border border-gray-300 rounded py-2 px-3 w-64 sm:w-72 ${errors.fullname ? 'border-red-500' : ''} placeholder-black`} type='text' id="fullname" name="fullname" placeholder='Full name' {...register('fullname', { required: 'First Name is required' })} />
              {errors?.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
            </div>
            <div className="mb-3 sm:mb-5">
              <input className={`block border border-gray-300 rounded py-2 px-3 w-64 sm:w-72 ${errors.email ? 'border-red-500' : ''} placeholder-black`} type='email' id="email" name="email" placeholder='Email' {...register('email', { required: 'First Email is required' })} />
              {errors?.email && <p className="text-red-500">{errors.email.message}</p>}
            </div>

            <div className="mb-3 sm:mb-5">
              <input className={`block border border-gray-300 rounded py-2 px-3 w-64 sm:w-72 ${errors.password ? 'border-red-500' : ''} placeholder-black`} type='password' id="password" name="password" placeholder='Password'  {...register('password', {
                required: 'Password is required', minLength: {
                  value: 4,
                  message: 'Minimum 4 char expected'
                }
              })} />
              {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            <div className='mb-3 sm:mb-5 flex items-start'>
              <Checkbox onChange={onChange} />
              <span className="text-black ml-2"> I agree with</span>
              <span className="underline text-[#0080D9] ml-1">
                <a href="https://www.w3schools.com">Terms of service</a>
              </span>
            </div>

            <div className="flex justify-center mb-3 sm:mb-5">
              <button className="bg-[#0068cc]  text-white py-2 w-64 px-4 rounded sm:w-72" type="submit" >Get Started</button>

            </div>
            <div className='mb-3 sm:w-72 flex justify-center sm:mb-5'>
              <button className='font-medium' onClick={handleOpenSignin}>Sign in</button>
            </div>

          </form>
        </div>

      </div>



    </div>

  )
}

export default Signup