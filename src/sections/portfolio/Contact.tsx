import TouchPoint from "@/components/playfolio/Contact/Contact";
import FirebaseController from "@/firebase/controller";
import { FirebaseContext } from "@/hooks/useFirebase";
import { setContacts } from "@/store/contactSlice";
import { useStateDispatch, useStateSelector } from "@/store/store";
import { useContext, useEffect, useState } from "react";

export default function Contact() {
    const { contacts } = useStateSelector((state) => state.contact);

    const firebaseInstance = useContext(FirebaseContext) as FirebaseController;
    const dispatch = useStateDispatch();

    useEffect(() => {
        if (!contacts) {
            firebaseInstance.fetchContacts()
                .then((data) => {
                    dispatch(setContacts(data));
                });
        }
    }, [contacts, dispatch, firebaseInstance]);

    return (
        <section id='contact' className='w-screen bg-black text-white pl-10 pr-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Lets Chat.
            </h1>
            <div className='grid grid-cols-3'>
                { contacts && contacts.map((contact) => {
                    return (
                        <TouchPoint 
                            key={contact.id}
                            content={contact.data.value}
                            type={contact.data.title.toUpperCase() as 'EMAIL' | 'LINKEDIN' | 'INSTAGRAM'}
                        />
                    )
                })}
            </div>
        </section>
    );
}