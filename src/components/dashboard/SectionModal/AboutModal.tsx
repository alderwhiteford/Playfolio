/* eslint-disable react-hooks/exhaustive-deps */
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { Button, Modal, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setError, setSuccess } from "@/store/alertSlice";
import { setAbout } from "@/store/aboutSlice";

type AboutModalProps = {
    handleClose: () => void,
    open: boolean,
}

type AboutFormProps = {
    greeting: string,
    introduction: string,
}

export default function AboutModal({ handleClose, open }: AboutModalProps) {
    const { introduction, greeting } = useStateSelector((state) => state.about)

    const { 
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<AboutFormProps>({});

    const dispatch = useStateDispatch();

    const firebaseInstance = useContext(FirebaseContext) as FirebaseController

    useEffect(() => {
        firebaseInstance.fetchAbout()
            .then((data) => {
                dispatch(setAbout(data))
            })
    }, []);

    const validateIntroduction = (introduction: string): boolean => {
        return introduction.split('**').length % 2 !== 0
    }

    const onSubmit = ({ greeting, introduction}: AboutFormProps) => {
        if (!validateIntroduction(introduction)) {
            dispatch(setError('failedToUpdateAbout'))
            return
        }

        firebaseInstance.updateAbout(greeting, introduction)
            .then(() => {
                dispatch(setSuccess('updatedAbout'))
                dispatch(setAbout({ greeting, introduction }))
            })
            .catch(() => {
                dispatch(setError('failedToUpdateAbout'))
            })
    }

    return (
        <Modal
            open={open}
            onClose={() => {
                setValue('greeting', greeting)
                setValue('introduction', introduction)
                handleClose()
            }}
            disableAutoFocus
        >
            <form 
                className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col gap-[20px] overflow-scroll'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className='text-white text-2xl font-medium'>
                    About
                </h1>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Greeting</h3>
                    <TextField
                        {...register('greeting', { required: true })}
                        error={Boolean(errors.greeting)}
                        fullWidth
                        required
                        defaultValue={greeting}
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Introduction</h3>
                    <TextField
                        {...register('introduction', { required: true })}
                        error={Boolean(errors.introduction)}
                        rows={5}
                        multiline
                        fullWidth
                        required
                        defaultValue={introduction}
                    />
                </div>
                <Button
                    className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                    variant="outlined"
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </Modal>
    )
}