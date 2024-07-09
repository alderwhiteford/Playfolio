'use client'

import FirebaseController from "@/firebase/controller";
import { AlertContext, AlertContextProps } from "@/hooks/useAlert";
import { FirebaseContext } from "@/hooks/useFirebase";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { FormEvent, useContext } from "react";
import { useForm } from "react-hook-form";

type LoginFormProps = {
    email: string;
    password: string;
}

export default function SignIn() {
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;
    const alertInstance = useContext(AlertContext) as AlertContextProps;
    const router = useRouter();

    const handleLogin = (data: LoginFormProps) => {        
        firebaseInstance.signIn(data.email, data.password)
            .catch(() => {
                alertInstance.setError('failedToSignIn')
            })
    }

    const { 
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormProps>();

    return (
        <div className='w-full h-screen flex flex-col gap-4 items-center justify-center bg-black pl-[35%] pr-[35%] text-white'>
            <div className='flex flex-col items-center mb-5'>
                <h1 className='text-[30px] md:text-[40px] leading-[50px] font-extralight'>
                    Welcome to the portfolio of
                </h1>
                <h1 className='text-[30px] md:text-[40px] leading-[50px] text-[#77a4ed]'>
                    Alder Whiteford
                </h1>
            </div>
            <h3 className='text-gray-100 font-extralight self-start text-sm'>
                Please sign-in to access the management dashboard
            </h3>
            <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit(handleLogin)}>
                <TextField 
                    {...register('email', { required: true })}
                    label='Email' 
                    required
                    error={Boolean(errors.email)}
                    fullWidth
                />
                <TextField 
                    {...register('password', { required: true })}
                    label='Password' 
                    required
                    error={Boolean(errors.password)}
                    fullWidth
                />
                <Button 
                    className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-3' 
                    variant='outlined' 
                    type='submit'
                    fullWidth
                >
                    Continue to Dashboard
                </Button>
            </form>
            <Button 
                className='border-gray-400 text-gray-400 normal-case hover:bg-gray-400 hover:bg-opacity-30 hover:text-white p-3' 
                variant='outlined' 
                onClick={() => router.push('/')}
                fullWidth
            >
                Return to Portfolio
            </Button>
        </div>
    )
}
