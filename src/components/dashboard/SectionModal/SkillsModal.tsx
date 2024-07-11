/* eslint-disable react-hooks/exhaustive-deps */
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { Button, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setSkills } from "@/store/skillsSlice";
import Skill from "@/components/playfolio/Skill/Skill";
import { setError, setSuccess } from "@/store/alertSlice";

type SkillsModalProps = {
    handleClose: () => void,
    open: boolean,
}

export default function SkillsModal({ handleClose, open }: SkillsModalProps) {
    const { skills } = useStateSelector((state) => state.skills)

    const [selectedSkills, setSelectedSkills] = useState<string[]>([])
    const dispatch = useStateDispatch();
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController

    const handleSkillSelect = (title: string) => {
        if (selectedSkills.includes(title)) {
            setSelectedSkills(selectedSkills.filter((selectedSkill) => selectedSkill !== title))
        } else {
            setSelectedSkills([...selectedSkills, title])
        }
    }

    const handleSkillDeletion = () => {
        let error = false;
        selectedSkills.forEach((skill) => {
            firebaseInstance.deleteSkill(skill)
                .then(() => {
                    dispatch(setSkills(skills.filter((s) => s.title !== skill)))
                })
                .catch(() => {
                    dispatch(setError('failedToDeleteSkill'))
                    error = true;
                })
        })

        if (!error) {
            dispatch(setSuccess('deletedSkills'))
        }
    }

    useEffect(() => {
        firebaseInstance.fetchSkills()
            .then((data) => {
                dispatch(setSkills(data))
            })
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableAutoFocus
        >
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col overflow-scroll gap-5'>
                <div className='flex flex-row flex-wrap justify-evenly'>
                    {skills && skills.map((skill) => {
                        return (
                            <div 
                                key={skill.title}
                                onClick={() => handleSkillSelect(skill.title)}
                                className={`${selectedSkills.includes(skill.title) ? 'bg-red-500 bg-opacity-70' : ''} rounded-2xl cursor-pointer transition-all`}
                            >
                                <Skill 
                                    title={skill.title}
                                    icon={skill.logo}
                                    dashboard
                                />
                            </div>
                        )
                    })}
                </div>
                <Button
                    className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2'
                    variant="outlined"
                    type="submit"
                >
                    Save
                </Button>
                <Button
                    className='border-red-500 text-red-500 normal-case hover:bg-red-500 hover:bg-opacity-30 hover:text-white p-2'
                    variant="outlined"
                    type="submit"
                    disabled={selectedSkills.length === 0}
                    onClick={handleSkillDeletion}
                >
                    Delete Selected
                </Button>
            </div>
        </Modal>
    )
}