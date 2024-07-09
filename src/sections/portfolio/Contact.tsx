import TouchPoint from "@/components/Contact/Contact";

export default function Contact() {
    return (
        <section id='contact' className='w-screen bg-black text-white pl-10 pr-10 md:pr-32 md:pl-32 font-light text-[50px] pt-16 pb-16'>
            <h1>
                Lets Chat.
            </h1>
            <div className='grid grid-cols-3'>
                <TouchPoint 
                    content="mailto:whiteford.a@northeastern.edu"
                    type="EMAIL"
                />
                <TouchPoint 
                    content="https://www.linkedin.com/in/alderwhiteford/"
                    type="LINKEDIN"
                />
                <TouchPoint 
                    content="https://www.instagram.com/aldersgallery/"
                    type="INSTAGRAM"
                />
            </div>
        </section>
    );
}