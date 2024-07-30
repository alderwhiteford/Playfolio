import { Contact, IdToItem, Project } from "@/types/models";
import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

export type ContactFormValues = {
    id: string,
    value: string,
}

type ContactFormProps = {
    contact: IdToItem<Contact>,
    onSubmit: SubmitHandler<ContactFormValues>,
}

export default function ContactForm({ contact, onSubmit }: ContactFormProps) {
    
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ContactFormValues>({
        defaultValues: {
            id: contact.id,
            value: contact.data.value || ''
        }
    });
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-2'>
                <h1 className='text-white text-2xl font-medium'>
                    { contact.data.title }
                </h1>
                <TextField
                    {...register('value', { required: true })}
                    error={Boolean(errors.value)}
                    fullWidth
                />
            </div>
            <Button
                className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                variant="outlined"
                type="submit"
                fullWidth
            >
                Save
            </Button>
        </form>
    )
}