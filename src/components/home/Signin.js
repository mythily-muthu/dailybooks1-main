import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import dailybooks_logo from '../../images/download (1).png'

function Signin() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    console.log(errors)

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log('get the backend data', data)
        try {
            const response = await axios.post('http://localhost:3099/create', data); // Replace '/api/login' with your backend endpoint
            console.log('this is go to backend data', response.data);
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenSignup = (item) => {
        navigate(`/signup`)
    }
    const handleOpenSignin = () => {
        navigate(`/employee`)
    }


    return (
        <div className='fixed inset-0 bg-[#F6F9FC] flex items-center justify-center flex-col'>
            {/* <div className="flex items-center justify-center flex-col"> */}
            <div className='w-48 pb-4 sm:w-60'><img src={dailybooks_logo} alt=''></img>     </div>
            <form className="bg-[#FFFFFF] rounded-lg flex items-center justify-center flex-col p-5 sm:px-10 sm:py-5 sm:drop-shadow-lg" onSubmit={handleSubmit(onSubmit)}>
                <p className='mb-6 font-semibold text-xl sm:text-2xl'>Sign in</p>
                <div className="mb-4 sm:mb-5">

                    <input className={`block border border-gray-300 rounded py-2 px-3 w-64 sm:w-80 ${errors.name ? 'border-red-500' : ''}`} type="text" id="name" name="name" placeholder='Username or email' {...register('name', { required: 'First Name is required' })} />
                    {errors?.name && <p className="text-red-500">{errors.name.message}</p>}
                </div>

                <div className="mb-4 sm:mb-5">

                    <input className={`block border border-gray-300 rounded py-2 px-3 w-64 sm:w-80 ${errors.password ? 'border-red-500' : ''}`} type='password' id="password" name="password" placeholder='Password' {...register('password', {
                        required: 'Password is required', minLength: {
                            value: 4,
                            message: 'Minimum 4 char expected'
                        }
                    })} />
                    {errors?.password && <p className="text-red-500">{errors.password.message}</p>}
                    <p className='font-medium mt-2'>Forgot password?</p>
                </div>


                <div className="flex justify-center mb-4 sm:mb-5">
                    <button onClick={handleOpenSignin} className="bg-[#0068cc]  text-white py-2 w-64 px-4 rounded sm:w-80" type="submit" >Submit</button>

                </div>
                <div>
                    <button onClick={handleOpenSignup} className='mt-2 font-medium w-64 sm:w-80'>Creat Account</button>
                </div>

            </form>
            {/* </div> */}


        </div>
    )
}

export default Signin

