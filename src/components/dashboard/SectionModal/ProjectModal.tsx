import { IdToProject } from "@/types/models";
import { Modal } from "@mui/material";
import { useState } from "react";

type ProjectModalProps = {
    handleClose: () => void,
    open: boolean,
}

export default function ProjectModal({ handleClose, open }: ProjectModalProps) {
    const [selectedProject, setSelectedProject] = useState<IdToProject | undefined>();
    const [isCreating, setIsCreating] = useState<boolean>(false);

    const ProjectViewContent = () => {
        return (
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col overflow-scroll gap-8'>
                Viewing Content!
            </div>
        )
    }

    const ProjectEditAddContent = () => {
        return (
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col overflow-scroll gap-8'>
                Adding Content!
            </div>
        )
    }

    return (
        <Modal
            onClose={handleClose}
            open={open}
        >
            {selectedProject || isCreating ? <ProjectEditAddContent /> : <ProjectViewContent />}
        </Modal>
    )
}