import Card from "@/components/Card/Card";

export default function Work() {
    return (
        <section id='work' className='w-screen bg-black text-white pr-10 pl-10 lg:pr-32 lg:pl-32 font-light text-[50px] pb-16'>
            <h1>
                Work.
            </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <Card backgroundImage='https://i.imgur.com/eqpNJeE.jpg' logo='https://i.imgur.com/9OrIVkq.png' position='Web Developer' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/usBJmYm.png' link="https://scout.camd.northeastern.edu/"/>
                <Card backgroundImage='https://i.imgur.com/WSFCoiE.jpg' logo='https://i.imgur.com/ZoV1ekp.png' position='Software Project Lead' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/vmCGXvD.png' link="https://www.instagram.com/generatenu/"/>
                <Card backgroundImage='https://i.imgur.com/4XwaPso.jpg' logo='https://i.imgur.com/A990JUa.png' position='Photographer' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/SfSmpRo.png' link="https://www.tastemakersmag.com/"/>
                <Card backgroundImage='https://i.imgur.com/oDeM93Y.jpg' logo='https://i.imgur.com/E7gnkWQ.png' position='Frontend Engineer Co-op' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/zudM8uM.png' link="https://www.asicsdigital.com/"/>
                <Card backgroundImage='https://i.imgur.com/A6Wc8oR.jpg' logo='https://i.imgur.com/u17e8mn.png' position='Digital Developer Co-op' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/VND1Xk0.png' link="https://www.mfs.com/corporate/en/home.html"/>
                <Card backgroundImage='https://i.imgur.com/fCbFz8N.png' logo='https://i.imgur.com/rOFQAMh.png' position='Senior Associate' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/EzjoSBw.png' link="https://huntingtonangelsnetwork.com/"/>
                <Card backgroundImage='https://i.imgur.com/2EoWXS3.jpg' logo='https://i.imgur.com/3iJe249.png' position='Peer Tutor - Computer Science' dates='Jul. 2023 - Dec. 2023' cursor='https://i.imgur.com/GhF5yjd.png' link="https://northeasternpeertutoring.sites.northeastern.edu/"/>
           </div>
        </section>
    );
}