import { IdToItem, Project, Skill } from "@/types/models"
import { Button, MenuItem, Select, TextField } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DeleteIcon from '@mui/icons-material/Delete';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 200,
            width: 250,
        },
    },
};

type ProjectFormProps = {
    allSkills: Skill[],
    setSelectedProject: Dispatch<SetStateAction<IdToItem<Project> | undefined>>
    handleDelete: () => void,
    onSubmit: SubmitHandler<Project>,
    setIsCreating: Dispatch<SetStateAction<boolean>>,
    project?: Project,
}

export default function ProjectForm({ allSkills, setSelectedProject, handleDelete, onSubmit, setIsCreating, project }: ProjectFormProps) {
    const [deleteState, setDeleteState] = useState<'none' | 'pending'>('none');

    const { 
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<Project>({
        defaultValues: {
            title: project?.title || '',
            description: project?.description || '',
            image: project?.image || '',
            skills: project?.skills || [],
            additional_info: project?.additional_info || '',
            github: project?.github || '',
            live_link: project?.live_link || '',
        }
    });

    const [skills] = watch(['skills']);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-[20px]'>
            <div className='flex flex-col gap-[20px] w-full overflow-scroll'>
                <h1 className='text-white text-2xl font-medium'>
                    Project
                </h1>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Title</h3>
                    <TextField
                        {...register('title', { required: true })}
                        error={Boolean(errors.title)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Description</h3>
                    <TextField
                        {...register('description', { required: true })}
                        error={Boolean(errors.description)}
                        rows={3}
                        multiline
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Preview Image Link</h3>
                    <TextField
                        {...register('image', { required: true })}
                        error={Boolean(errors.image)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Relevant Skills</h3>
                    <Select
                        {...register('skills', { required: true })}
                        error={Boolean(errors.skills)}
                        fullWidth
                        required
                        multiple
                        value={skills ?? []}
                        MenuProps={MenuProps}
                    >
                        {allSkills.map((skill, index) => (
                            <MenuItem
                                key={index}
                                value={skill.title}
                            >
                                {skill.title}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Additional Info Link</h3>
                    <TextField
                        {...register('additional_info')}
                        error={Boolean(errors.additional_info)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>GitHub Repository Link</h3>
                    <TextField
                        {...register('github')}
                        error={Boolean(errors.github)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Live Application Link</h3>
                    <TextField
                        {...register('live_link')}
                        error={Boolean(errors.live_link)}
                        fullWidth
                    />
                </div>
            </div>
            <div className='flex flex-col gap-5'>
                <Button
                    className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                    variant="outlined"
                    type="submit"
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                >
                    { project ? 'Save' : 'Create' }
                </Button>
                <Button
                    className='border-red-500 text-red-500 normal-case hover:bg-red-500 hover:bg-opacity-30 hover:text-white p-2'
                    variant="outlined"
                    fullWidth
                    onClick={() => { 
                        !project && setIsCreating(false);
                        setSelectedProject(undefined)
                    }}
                >
                    Close
                </Button>
                { project && 
                    <div className='flex flex-row gap-3'>
                        <Button
                            className='flex-grow border-red-500 text-white bg-red-500 bg-opacity-25 normal-case hover:bg-opacity-50 hover:text-white p-2'
                            variant="outlined"
                            onClick={deleteState === 'none' ? () => setDeleteState('pending') : handleDelete}
                            startIcon={<DeleteIcon />}
                        >
                            {deleteState === 'none' ? 'Delete Project' : 'Confirm'}
                        </Button>
                        {deleteState === 'pending' && (
                            <Button
                                className='flex-grow border-gray-300 text-white bg-gray-300 bg-opacity-25 normal-case hover:bg-opacity-50 hover:text-white p-2'
                                variant="outlined"
                                onClick={() => setDeleteState('none')}
                            >
                                {'Cancel'}
                            </Button>
                        )}
                    </div>
                }
            </div>
        </form>
    )
}