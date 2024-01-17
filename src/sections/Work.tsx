import Card from "@/components/Card/Card";

export default function Work() {
    return (
        <section className='w-screen bg-black text-white pr-32 pl-32 font-light text-[50px]'>
            <h1>
                Work.
            </h1>
            <div className='grid grid-cols-2 gap-10 mt-10'>
                <Card backgroundImage='https://i.imgur.com/oDeM93Y.jpg' logo='https://i.imgur.com/E7gnkWQ.png' position='Frontend Engineer Co-op' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/zudM8uM.png'/>
                <Card backgroundImage='https://i.imgur.com/A6Wc8oR.jpg' logo='https://i.imgur.com/u17e8mn.png' position='Digital Developer Co-op' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/VND1Xk0.png'/>
                <Card backgroundImage='https://i.imgur.com/4XwaPso.jpg' logo='https://i.imgur.com/A990JUa.png' position='Photographer' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/SfSmpRo.png'/>
                <Card backgroundImage='https://i.imgur.com/fCbFz8N.png' logo='https://i.imgur.com/rOFQAMh.png' position='Senior Associate' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/EzjoSBw.png'/>
            </div>
        </section>
    );
}