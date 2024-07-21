import Card from "@/components/playfolio/Card/Card";
import { ExperienceSectionProps } from "@/components/playfolio/Card/CardExperience/CardExperience";
import { IdToWork, Skill, Work, WorkPosition } from "@/types/models";
import { Skill as SkillTitle } from "@/components/playfolio/Project/Project";
import { Button, Checkbox, MenuItem, Select, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import dayjs from "dayjs";
import DeleteIcon from '@mui/icons-material/Delete';

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 200,
            width: 250,
        },
    },
};

const months = [
    'Jan.',
    'Feb.',
    'Mar.',
    'Apr.',
    'May',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sep.',
    'Oct.',
    'Nov.',
    'Dec.',
]

export const parsePositions = (positions?: WorkPosition[]): ExperienceSectionProps[] | undefined => {
    return positions?.map((position) => {
        let endDateString = 'Present';

        if (!position.start_date) {
            return {
                dates: `N/A - ${endDateString}`,
                position: position.title,
                description: position.description.split("\n"),
                inProgress: position.inProgress,
            }
        }

        const startMonth = new Date(position.start_date as number * 1000).getMonth();
        const startYear = new Date(position.start_date as number * 1000).getFullYear();
        const startDateString = `${months[startMonth]} ${startYear}`;
        
        if (!position.inProgress && position.end_date !== -1) {
            const endMonth = new Date(position.end_date as number * 1000).getMonth();
            const endYear = new Date(position.end_date as number * 1000).getFullYear();
            endDateString = `${months[endMonth]} ${endYear}`;
        }

        return {
            dates: `${startDateString} - ${endDateString}`,
            position: position.title,
            description: position.description.split("\n"),
            inProgress: position.inProgress,
    }})
}

type WorkFormProps = {
    allSkills: Skill[],
    setSelectedWork: Dispatch<SetStateAction<IdToWork | undefined>>
    handleDelete: () => void,
    onSubmit: (work: Work) => void,
    setIsCreating: Dispatch<SetStateAction<boolean>>,
    work?: Work,
}

export default function WorkForm({ allSkills, work, setSelectedWork, handleDelete, onSubmit, setIsCreating }: WorkFormProps) {
    const [deleteState, setDeleteState] = useState<'none' | 'pending'>('none');

    const { 
        register,
        handleSubmit,
        formState: { errors },
        watch,
        control,
        setValue,
    } = useForm<Work>({
        defaultValues: {
            description: work?.description || '',
            link: work?.link || '',
            logo: work?.logo || '',
            image: work?.image || '',
            hover_emoji: work?.hover_emoji || '',
            positions: work?.positions || [],
            highlighted_position: work?.highlighted_position ?? 0,
            skills: work?.skills || [],
        }
    });

    const { append, remove } = useFieldArray({
        control,
        name: 'positions',
    });

    const [positions, description, hover_emoji, link, logo, image, skills, highlighted_position] = watch(['positions', 'description', 'hover_emoji', 'link', 'logo', 'image', 'skills', 'highlighted_position']);

    return (
        <form 
            className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] flex flex-row gap-[20px] rounded-xl overflow-hidden'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className='flex flex-col gap-[20px] w-full overflow-scroll'>
                <h1 className='text-white text-2xl font-medium'>
                    Work
                </h1>
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
                    <h3 className='text-white font-light text-md'>Website Link</h3>
                    <TextField
                        {...register('link', { required: true })}
                        error={Boolean(errors.link)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Logo Link</h3>
                    <TextField
                        {...register('logo', { required: true })}
                        error={Boolean(errors.logo)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Background Image Link</h3>
                    <TextField
                        {...register('image', { required: true })}
                        error={Boolean(errors.image)}
                        fullWidth
                    />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Hover Icon</h3>
                    <TextField
                        {...register('hover_emoji', { required: true })}
                        error={Boolean(errors.hover_emoji)}
                        fullWidth
                    />
                </div>
                <Controller
                    control={control}
                    name='positions'
                    render={() => (
                        <div className='flex flex-col gap-[20px] w-full'>
                            <h3 className='text-white font-medium text-lg'>Positions</h3>
                            {positions?.map((_, index) => (
                                <div 
                                    className='flex flex-col gap-[20px]'
                                    key={index}
                                >
                                    <div className='flex flex-row justify-between w-full items-center'>
                                        <h3 className='font-normal text-md text-[#77a4ed]'>{`Position #${index + 1}`}</h3>
                                        <div className='text-white font-extralight'>
                                            Highlight Position
                                            <Checkbox 
                                                checked={highlighted_position === index}
                                                onChange={() => setValue('highlighted_position', highlighted_position === index ? -1 : index)}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <h3 className='text-white font-light text-md'>Title</h3>
                                        <TextField
                                            {...register(`positions.${index}.title`, { required: true })}
                                            fullWidth
                                            required
                                            error={Boolean(errors.positions?.[index]?.title)}
                                            onChange={(event) => setValue(`positions.${index}.title`, event.target.value)}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <h3 className='text-white font-light text-md'>Start Day</h3>
                                        <DatePicker
                                            {...register(`positions.${index}.start_date`, { required: true })}
                                            onChange={(day) => setValue(`positions.${index}.start_date`, day?.unix() ?? 0)}
                                            defaultValue={positions[index].start_date ? dayjs(positions[index].start_date as number * 1000) : null}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <h3 className='text-white font-light text-md'>End Day</h3>
                                        <DatePicker
                                            {...register(`positions.${index}.end_date`, { required: false })}
                                            onChange={(day) => { 
                                                setValue(`positions.${index}.inProgress`, !day)
                                                setValue(`positions.${index}.end_date`, day?.unix()) 
                                            }}
                                            disableFuture
                                            disabled={!positions[index].start_date}
                                            minDate={dayjs(positions[index].start_date * 1000)}
                                            defaultValue={positions[index].end_date !== -1 ? dayjs(positions[index].end_date as number * 1000) : null}
                                        />
                                    </div>
                                    <div className='flex flex-col gap-2 w-full'>
                                        <h3 className='text-white font-light text-md'>Description</h3>
                                        <TextField
                                            {...register(`positions.${index}.description`, { required: true })}
                                            error={Boolean(errors.positions?.[index]?.description)}
                                            multiline
                                            fullWidth
                                            required
                                            onChange={(event) => setValue(`positions.${index}.description`, event.target.value)}
                                        />
                                    </div>
                                    <Button
                                        className='border-red-500 text-red-500 normal-case hover:bg-red-500 hover:bg-opacity-30 hover:text-white p-2'
                                        variant="outlined"
                                        fullWidth
                                        onClick={() => remove(index)}
                                    >
                                        Remove Position
                                    </Button>
                                </div>
                            ))}
                            <Button
                                className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                                variant="outlined"
                                fullWidth
                                onClick={() => append({ title: '', start_date: 0, end_date: -1, description: '', inProgress: true })}
                            >
                            Add Position
                            </Button>
                        </div>
                    )}                     
                />
                <div className='flex flex-col gap-2 w-full'>
                    <h3 className='text-white font-light text-md'>Relevant Skills</h3>
                    <Select
                        {...register('skills')}
                        error={Boolean(errors.hover_emoji)}
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
            </div>
            <div className='p-5 w-full h-full flex flex-col gap-12 justify-center text-white'>
                <Card
                    backgroundImage={image}
                    logo={logo}
                    cursor={hover_emoji}
                    link={link}
                    description={description}
                    experiences={parsePositions(positions)}
                    highlighted_position={highlighted_position}
                    skills={skills.map((s) => allSkills.find((skill) => skill.title === s) as Skill)}
                />
                <div className='flex flex-col gap-5'>
                    <Button
                        className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                        variant="outlined"
                        type="submit"
                        fullWidth
                        onClick={handleSubmit(onSubmit)}
                    >
                        { work ? 'Save' : 'Create' }
                    </Button>
                    <Button
                        className='border-red-500 text-red-500 normal-case hover:bg-red-500 hover:bg-opacity-30 hover:text-white p-2'
                        variant="outlined"
                        fullWidth
                        onClick={() => { 
                            !work && setIsCreating(false);
                            setSelectedWork(undefined)
                        }}
                    >
                        Close
                    </Button>
                    {work && 
                        <div className='flex flex-row gap-3'>
                            <Button
                                className='flex-grow border-red-500 text-white bg-red-500 bg-opacity-25 normal-case hover:bg-opacity-50 hover:text-white p-2'
                                variant="outlined"
                                onClick={deleteState === 'none' ? () => setDeleteState('pending') : handleDelete}
                                startIcon={<DeleteIcon />}
                            >
                                {deleteState === 'none' ? 'Delete Work' : 'Confirm'}
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
            </div>
        </form>
    )
}