/* eslint-disable react-hooks/exhaustive-deps */
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { Button, Modal, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setSkills } from "@/store/skillsSlice";
import Skill from "@/components/playfolio/Skill/Skill";
import { setError, setSuccess } from "@/store/alertSlice";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useForm } from "react-hook-form";
import PlayfolioTooltip from "@/components/playfolio/Tooltip/Tooltip";

type SkillsModalProps = {
    handleClose: () => void,
    open: boolean,
}

type SkillsFormProps = {
    title: string,
    logo: FileList,
}

export default function SkillsModal({ handleClose, open }: SkillsModalProps) {
    const { skills } = useStateSelector((state) => state.skills)

    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const [adding, setAdding] = useState<boolean>(false);

    const dispatch = useStateDispatch();
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController

    const { 
        register,
        handleSubmit,
        watch,
        reset,
        setError: setFormError,
        formState: { errors }
    } = useForm<SkillsFormProps>({
        mode: 'onSubmit'
    });

    const [logo] = watch(['logo']);

    const handleSkillSelect = (title: string) => {
        if (selectedSkills.includes(title)) {
            setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== title))
        } else {
            setSelectedSkills([...selectedSkills, title])
        }
    }

    const handleSkillDeletion = async () => {
        let error = false;
        let skillsToRemove: string[] = [];
        selectedSkills.map((skill) =>
            firebaseInstance.deleteSkill(skill)
                .then(() => {
                    skillsToRemove.push(skill);
                })
                .catch(() => {
                    dispatch(setError('failedToDeleteSkill'));
                    error = true;
                })
        );
    
        dispatch(setSkills(skills?.filter((s) => !selectedSkills.includes(s.title))));
        setSelectedSkills([]);

        if (!error) {
            dispatch(setSuccess('deletedSkills'))
        }
    }

    const handleCreateSkill = (data: SkillsFormProps) => {
        if (!data.logo || data.logo.length === 0) {
            setFormError('logo', { message: 'You must provide a logo!' })
            return;
        }

        if (skills) {
            firebaseInstance.createSkill(data.title, data.logo[0])
                .then((skill) => {
                    dispatch(setSkills([...skills, skill]))
                    dispatch(setSuccess('createdSkill'))
                    setAdding(false);
                    reset();
                })
                .catch(() => {
                    dispatch(setError('failedToCreateSkill'))
                })
        } else {
            dispatch(setError('failedToCreateSkill'))
        }
    }

    useEffect(() => {
        if (!skills) {
            firebaseInstance.fetchSkills()
                .then((data) => {
                    dispatch(setSkills(data))
                });
        }
    }, []);

    const SkillsViewContent = () => {
        return (
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col overflow-scroll gap-8'>
                <div className='flex flex-row flex-wrap gap-2 justify-center'>
                    {skills && skills.map((skill) => {
                        return (
                            <PlayfolioTooltip 
                                key={skill.title}
                                title={skill.title}
                            >
                                <div 
                                    onClick={() => handleSkillSelect(skill.title)}
                                    className={`${selectedSkills.includes(skill.title) ? 'bg-red-500 bg-opacity-70' : ''} rounded-2xl cursor-pointer transition-all`}
                                >
                                    <Skill 
                                        title={skill.title}
                                        icon={skill.logo}
                                        dashboard
                                    />
                                </div>
                            </PlayfolioTooltip>

                        )
                    })}
                </div>
                <div className='flex flex-col gap-5'>
                    <Button
                        className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                        variant="outlined"
                        onClick={() => setAdding(true)}
                    >
                        Add Skill
                    </Button>
                    <Button
                        className='border-red-500 text-red-500 normal-case hover:bg-red-500 hover:bg-opacity-30 hover:text-white p-2'
                        variant="outlined"
                        disabled={selectedSkills.length === 0}
                        onClick={handleSkillDeletion}
                    >
                        Delete Selected
                    </Button>
                </div>
            </div>
        )
    }

    const SkillsAddContent = () => {
        return (
            <form 
                className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col overflow-scroll gap-8'
                onSubmit={handleSubmit(handleCreateSkill)}
            >
                <div className='flex flex-col gap-2'>
                    <h1 className='text-white text-2xl font-medium'>
                        Add Skill
                    </h1>
                    <div className='flex flex-col gap-5 w-full'>
                        <h3 className='text-white font-light text-md'>Title</h3>
                        <TextField
                            fullWidth
                            error={Boolean(errors.title)}
                            { ...register('title', { required: 'You must provide a title!' })}
                        />
                        <div className={`w-full h-20 ${!errors.logo ? 'border-[#484c57] hover:border-white' : 'border-[#f44336] hover:border-[2px]'} border-[1px] rounded-sm cursor-pointer relative flex items-center justify-center`}>
                            <input 
                                { ...register('logo', { required: false })}
                                className='w-full h-full opacity-0 z-10 cursor-pointer' 
                                type='file'
                            />
                            <div className='absolute self-center text-white font-extralight flex flex-row gap-2'>
                                {!logo?.[0] ? 
                                    <>
                                        <FileUploadIcon />
                                        <h1>Upload file</h1> 
                                    </> : 
                                    <h1>{logo[0].name}</h1>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <Button
                        className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                        variant="outlined"
                        type={"submit"}
                    >
                        Create
                    </Button>
                    <Button
                        className='border-red-500 text-red-500 normal-case hover:bg-red-500 hover:bg-opacity-30 hover:text-white p-2'
                        variant="outlined"
                        onClick={() => { 
                            reset();
                            setAdding(false);
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        )
    }

    return (
        <Modal
            open={open}
            onClose={() => { 
                setAdding(false);
                reset();
                setSelectedSkills([]);
                handleClose();
            }}
            disableAutoFocus
        >
            {adding ? <SkillsAddContent /> : <SkillsViewContent />}
        </Modal>
    )
}