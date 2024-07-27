/* eslint-disable @next/next/no-img-element */
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { IdToItem, Project, Skill } from "@/types/models";
import { Button, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import DragNDrop from "../DragNDrop/DragNDrop";
import { setProjects } from "@/store/projectsSlice";
import { setSkills } from "@/store/skillsSlice";
import { setError, setSuccess } from "@/store/alertSlice";
import ProjectForm from "@/forms/ProjectForm";

type ProjectModalProps = {
    handleClose: () => void,
    open: boolean,
}

export default function ProjectModal({ handleClose, open }: ProjectModalProps) {
    const { projects } = useStateSelector((state) => state.projects);
    const { skills: allSkills } = useStateSelector((state) => state.skills);

    const firebaseInstance = useContext(FirebaseContext) as FirebaseController
    const dispatch = useStateDispatch();

    const [selectedProject, setSelectedProject] = useState<IdToItem<Project> | undefined>();
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const ProjectViewComponent = (project: IdToItem<Project>) => (
        <div 
            key={project.id}
            className='w-full h-full'
            onClick={() => setSelectedProject(project)}
        >
                <div className='absolute z-10 w-full h-full bg-black bg-opacity-75 top-0 left-0' />
                <img 
                    src={project.data.image}
                    alt=""
                    className='absolute w-full h-full top-0 left-0 object-cover' 
                />
                <p className='absolute z-30 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white text-xl text-center'>
                    {project.data.title}
                </p>
        </div>
    )

    const ProjectViewContent = ({ projects }: { projects?: IdToItem<Project>[]}) => {
        return (
            <>
                {
                    projects && 
                    <DragNDrop
                        collectionName="projects"
                        items={projects}
                        setState={setProjects}
                        dispatch={dispatch}
                        firebaseInstance={firebaseInstance}
                        ItemComponent={ProjectViewComponent}
                    />
                }
                <Button
                    className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2 w-[65%]'
                    fullWidth
                    variant="outlined"
                    onClick={() => setIsCreating(true)}
                >
                    Create New Project
                </Button>
            </>
        )
    }

    const ProjectEditAddContent = () => {
        return (
            <ProjectForm
                allSkills={allSkills as Skill[]}
                setSelectedProject={setSelectedProject}
                handleDelete={handleDelete}
                onSubmit={onSubmit}
                setIsCreating={setIsCreating}
                project={selectedProject?.data}
            />
        )
    }

    const handleDelete = () => {
        if (selectedProject) {
            firebaseInstance.deleteProject(selectedProject.id as string)
                .then(() => {
                    dispatch(setSuccess('deletedWork'))
                    dispatch(setProjects(projects?.filter((project) => project.id !== selectedProject.id) as IdToItem<Project>[]))
                    setSelectedProject(undefined)
                })
                .catch(() => {
                    dispatch(setError('failedToDeleteWork'))
                })
        }
    };

    const onSubmit = (project: Project) => { 
        if (project) {            
            if (selectedProject) {
                project.order_position = selectedProject.data.order_position;

                firebaseInstance.updateProject(selectedProject.id, project)
                    .then(() => {
                        dispatch(setSuccess('updatedProject'))
                        dispatch(setProjects(projects?.map((p) => p.id === selectedProject.id ? { id: p.id, data: project } : p) as IdToItem<Project>[]));
                        setSelectedProject({ id: selectedProject.id, data: project });
                    })
                    .catch(() => {
                        dispatch(setError('failedToUpdateProject'))
                    })
            } else {
                project.order_position = projects ? projects.length + 1 : 1;

                firebaseInstance.createProject(project)
                    .then((id) => {
                        dispatch(setSuccess('createdProject'))
                        dispatch(setProjects([...(projects as IdToItem<Project>[]), { id, data: project }]))
                        setSelectedProject({ id, data: project });
                        setIsCreating(false);
                    })
                    .catch(() => {
                        dispatch(setError('failedToCreateProject'))
                    })
            }
        }
    };


    useEffect(() => {
        if (!allSkills) {
            firebaseInstance.fetchSkills()
                .then((skills) => {
                    dispatch(setSkills(skills))
                })
                .catch(() => {
                    dispatch(setError('failedToFetchSkills'))
                });
        }
        if (!projects) {
            firebaseInstance.fetchProjects()
                .then((projects) => {
                    dispatch(setProjects(projects as IdToItem<Project>[]));
                })
                .catch(() => {
                    dispatch(setError('failedToFetchWorks'))
                });
        }
    }, [allSkills, dispatch, firebaseInstance, projects]);

    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                setSelectedProject(undefined);
                setIsCreating(false);
            }}
            disableAutoFocus
        >
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[65%] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col items-center gap-10 overflow-scroll'>
                {(selectedProject || isCreating) && allSkills ? 
                    <ProjectEditAddContent /> :
                    <ProjectViewContent projects={projects}/>}
            </div>

        </Modal>
    )
}