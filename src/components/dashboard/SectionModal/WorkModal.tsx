/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { Button, Modal } from "@mui/material";
import { DragEvent, useContext, useEffect, useState } from "react";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setError, setSuccess } from "@/store/alertSlice";
import { setWorks } from "@/store/worksSlice";
import { setSkills } from "@/store/skillsSlice";
import WorkForm from "@/forms/WorkForm";
import { IdToWork, Work } from "@/types/models";

type WorkModalProps = {
    handleClose: () => void,
    open: boolean,
}

export default function WorkModal({ handleClose, open }: WorkModalProps) {
    const { works } = useStateSelector((state) => state.works);
    const { skills: allSkills } = useStateSelector((state) => state.skills);
    
    const firebaseInstance = useContext(FirebaseContext) as FirebaseController
    const dispatch = useStateDispatch();

    const [selectedWork, setSelectedWork] = useState<IdToWork | undefined>();
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [indexDragging, setIndexDragging] = useState<number>(-1);
    const [indexDraggingOver, setIndexDraggingOver] = useState<number>(-1);

    const handleDelete = () => {
        if (selectedWork) {
            firebaseInstance.deleteWork(selectedWork.id as string)
                .then(() => {
                    dispatch(setSuccess('deletedWork'))
                    dispatch(setWorks(works?.filter((work) => work.id !== selectedWork.id) as IdToWork[]))
                    setSelectedWork(undefined)
                })
                .catch(() => {
                    dispatch(setError('failedToDeleteWork'))
                })
        }
    }

    const onSubmit = (work: Work) => {
        if (work) {
            work.positions = work.positions.map((position) => {
                if (!position.end_date) {
                  position.inProgress = true;
                  return{
                    ...position,
                    end_date: -1,
                  }
                } else {
                  return position;
                }
            });

            work.order_position = works ? works.length + 1 : 0;
            
            if (selectedWork) {
                firebaseInstance.updateWork(selectedWork.id, work)
                    .then(() => {
                        dispatch(setSuccess('updatedWork'))
                        dispatch(setWorks(works?.map((w) => w.id === selectedWork.id ? { id: w.id, work } : w) as IdToWork[]))
                    })
                    .catch(() => {
                        dispatch(setError('failedToUpdateWork'))
                    })
            } else {
                firebaseInstance.createWork(work)
                    .then((id) => {
                        dispatch(setSuccess('createdWork'))
                        dispatch(setWorks([...(works as IdToWork[]), { id, work }]))
                        setSelectedWork({ id, work });
                        setIsCreating(false);
                    })
                    .catch(() => {
                        dispatch(setError('failedToCreateWork'))
                    })
            }
        }
    }

    const onDragEnd = (event: DragEvent) => {
        event.preventDefault(); 

        // We are currently dragging an item and the item is above another item
        if (indexDragging !== -1 && indexDraggingOver !== -1 && indexDragging !== indexDraggingOver && works) {

            const batchIndexUpdates: Record<string, number> = {}

            // Update the one currently being dragged:
            batchIndexUpdates[works[indexDragging].id] = indexDraggingOver + 1;

            if (indexDragging > indexDraggingOver) {
                // Update the rest of the items
                for (let i = indexDraggingOver ; i < indexDragging ; i++) {
                    batchIndexUpdates[works[i].id] = works[i].work.order_position + 1;
                }
            } else {
                for (let i = indexDragging + 1 ; i <= indexDraggingOver ; i++) {
                    batchIndexUpdates[works[i].id] = works[i].work.order_position - 1;
                }
            }

            // Update the work order:
            const oldWorks = works;
            const newWorks = works.map((work) => {
                if (batchIndexUpdates[work.id]) {
                    work = {id: work.id, work: { ...work.work, order_position: batchIndexUpdates[work.id] }};
                }
                return work;
            });
            newWorks.sort((a, b) => a.work.order_position - b.work.order_position);
            dispatch(setWorks(newWorks));

            firebaseInstance.batchUpdateWorkOrderPosition(batchIndexUpdates)
                .then(() => {
                    dispatch(setSuccess('updatedWorkOrder'));
                })
                .catch(() => {
                    // Roll back the works
                    dispatch(setWorks(oldWorks));
                    dispatch(setError('failedToUpdateWorkOrder'));
                })
        }

        return null;
    }

    const onDragOver = (event: DragEvent, index: number) => {
        event.preventDefault(); 
        indexDraggingOver !== index ? setIndexDraggingOver(index) : null
    }

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
        if (!works) {
            firebaseInstance.fetchWorks()
                .then((works) => {

                    dispatch(setWorks(works as IdToWork[]));
                })
                .catch(() => {
                    dispatch(setError('failedToFetchWorks'))
                });
        }
    }, []);

    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                setSelectedWork(undefined);
            }}
            disableAutoFocus
        >
                {(selectedWork || isCreating) && allSkills ? 
                    <WorkForm 
                        allSkills={allSkills} 
                        work={selectedWork?.work} 
                        handleDelete={handleDelete}
                        onSubmit={onSubmit}
                        setSelectedWork={setSelectedWork}
                        setIsCreating={setIsCreating}
                    /> : 
                    <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[65%] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col items-center gap-10 overflow-scroll'>
                        <div className='flex flex-row flex-wrap gap-5 justify-center w-full overflow-scroll'>
                            {works?.map((idToWork, index) => (
                                <div 
                                    key={idToWork.id}
                                    className='border-gray-500 border-[1px] p-5 rounded-xl hover:border-[#77a4ed] transition-all cursor-pointer w-[45%] h-[200px] relative overflow-hidden'
                                    onClick={() => setSelectedWork(idToWork)}
                                    onDragStart={() => setIndexDragging(index)}
                                    onDragOver={(event: DragEvent<HTMLDivElement>) => onDragOver(event, index)}
                                    onDragEnd={(event: DragEvent<HTMLDivElement>) => onDragEnd(event)}
                                    draggable
                                >
                                        <div className='absolute z-10 w-full h-full bg-black bg-opacity-40 top-0 left-0' />
                                        <img 
                                            src={idToWork.work.image}
                                            alt=""
                                            className='absolute w-full h-full top-0 left-0 object-cover' 
                                        />
                                        <img
                                             src={idToWork.work.logo}
                                             alt=""
                                             className='absolute z-20 w-[50%] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'
                                        />
                                </div>
                            ))}
                        </div>
                        <Button
                            className='border-[#77a4ed] text-[#77a4ed] normal-case hover:bg-[#77a4ed] hover:bg-opacity-30 hover:text-white p-2 w-[65%]'
                            fullWidth
                            variant="outlined"
                            onClick={() => setIsCreating(true)}
                        >
                            Create New Work
                        </Button>
                    </div>
                }
        </Modal>
    )
}