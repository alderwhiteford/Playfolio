/* eslint-disable react-hooks/exhaustive-deps */
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { setError, setSuccess } from "@/store/alertSlice";
import { setContacts } from "@/store/contactSlice";
import ContactForm, { ContactFormValues } from "@/forms/ContactForm";

type ContactModalProps = {
    handleClose: () => void,
    open: boolean,
}

export default function ContactModal({ handleClose, open }: ContactModalProps) {
    const { contacts } = useStateSelector((state) => state.contact);

    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;
    const dispatch = useStateDispatch();

    const onSubmit = ({ id, value }: ContactFormValues) => {
        const noChange = contacts?.find((contact) => contact.id === id)?.data.value === value;
        if (noChange) {
            return
        }

        firebaseInstance.updateContact(id, value)
            .then(() => {
                dispatch(setSuccess('updatedContact'))
                dispatch(setContacts(contacts?.map((contact) => contact.id === id ? { id, data: { title: contact.data.title, value } } : contact)))
            })
            .catch(() => {
                dispatch(setError('failedToUpdateContact'))
            })
    }

    useEffect(() => {
        if (!contacts) {
            firebaseInstance.fetchContacts()
                .then((data) => {
                    dispatch(setContacts(data))
                });
        }
    }, []);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableAutoFocus
        >
            <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] md:w-[700px] max-h-[80%] bg-gray-900 bg-opacity-90 border-gray-500 border-[1px] shadow-lg p-[40px] rounded-xl flex flex-col gap-[20px] overflow-scroll'>
                {contacts && contacts.map((contact, index) => {
                    return (
                        <ContactForm
                            key={index}
                            contact={contact}
                            onSubmit={onSubmit}
                        />
                    )
                })}
            </div>
        </Modal>
    )
}