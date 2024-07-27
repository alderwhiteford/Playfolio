import FirebaseController from "@/firebase/controller";
import { setError, setSuccess } from "@/store/alertSlice";
import { AppDispatch } from "@/store/store";
import { IdToItem } from "@/types/models";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { DragEvent, useState } from "react";

type OrderPosition = {
    order_position: number;
}

type DragNDropData<T> = T & OrderPosition;

type DragNDropItem<T> = {
    id: string;
    data: DragNDropData<T>;
}

type DragNDropProps<T> = {
    collectionName: string;
    items: DragNDropItem<T>[];
    setState: ActionCreatorWithPayload<any, any>;
    dispatch: AppDispatch;
    firebaseInstance: FirebaseController;
    ItemComponent: (item: IdToItem<T>) => React.ReactNode;
}

export default function DragNDrop<T>({ collectionName, items, setState, dispatch, firebaseInstance, ItemComponent }: DragNDropProps<T>) {
    const [indexDragging, setIndexDragging] = useState<number>(-1);
    const [indexDraggingOver, setIndexDraggingOver] = useState<number>(-1);

    const onDragEnd = (event: DragEvent) => {
        event.preventDefault(); 

        // We are currently dragging an item and the item is above another item
        if (indexDragging !== -1 && indexDraggingOver !== -1 && indexDragging !== indexDraggingOver && items) {

            const batchIndexUpdates: Record<string, number> = {}

            // Update the one currently being dragged:
            batchIndexUpdates[items[indexDragging].id] = indexDraggingOver + 1;

            if (indexDragging > indexDraggingOver) {
                // Update the rest of the items
                for (let i = indexDraggingOver ; i < indexDragging ; i++) {
                    batchIndexUpdates[items[i].id] = items[i].data.order_position + 1;
                }
            } else {
                for (let i = indexDragging + 1 ; i <= indexDraggingOver ; i++) {
                    batchIndexUpdates[items[i].id] = items[i].data.order_position - 1;
                }
            }

            const oldItems = items;
            const newItems = items.map((item) => {
                if (batchIndexUpdates[item.id]) {
                    item = {id: item.id, data: { ...item.data, order_position: batchIndexUpdates[item.id] }};
                }
                return item;
            });
            newItems.sort((a, b) => a.data.order_position - b.data.order_position);
            dispatch(setState(newItems));

            firebaseInstance.batchUpdateItemOrderPosition(batchIndexUpdates, collectionName)
                .then(() => {
                    dispatch(setSuccess('updatedItemOrder'));
                })
                .catch((error) => {
                    // Roll back the items
                    dispatch(setState(oldItems));
                    dispatch(setError('failedToUpdateItemOrder'));
                })
        }

        return null;
    }

    const onDragOver = (event: DragEvent, index: number) => {
        event.preventDefault(); 
        indexDraggingOver !== index ? setIndexDraggingOver(index) : null
    }

    return (
        <div className='flex flex-row flex-wrap gap-5 justify-center w-full overflow-scroll'>
            {items.map((item, index) => (
                <div 
                    key={item.id}
                    className='w-[45%] h-[200px] relative rounded-xl border-gray-500 border-[1px] p-5 hover:border-[#77a4ed] transition-all cursor-pointer overflow-hidden'
                    onDragStart={() => setIndexDragging(index)}
                    onDragOver={(event: DragEvent<HTMLDivElement>) => onDragOver(event, index)}
                    onDragEnd={(event: DragEvent<HTMLDivElement>) => onDragEnd(event)}
                    draggable
                >
                    {ItemComponent(item)}
                </div>
            ))}
        </div>
    )
}