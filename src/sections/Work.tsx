import Card from "@/components/Card/Card";

export default function Work() {
    return (
        <section id='work' className='w-screen bg-black text-white pr-10 pl-10 lg:pr-32 lg:pl-32 font-light text-[50px] pb-16'>
            <h1>
                Work.
            </h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10'>
                <Card 
                    backgroundImage='https://i.imgur.com/WSFCoiE.jpg'
                    logo='https://i.imgur.com/ZoV1ekp.png'
                    position='Chief of Software'
                    dates='Jul. 2024 - Present'
                    cursor='https://i.imgur.com/vmCGXvD.png'
                    link="https://www.instagram.com/generatenu/"
                    description="Generate is a student-led product development studio, working with industry clients and Northeastern founders from all backgrounds to turn their vision into reality."
                    experiences={[
                        {
                            position: 'Chief of Software',
                            dates: 'Jul. 2024 - Present',
                            description: [
                                "Responsible for guiding the direction of software development at Generate"
                            ],
                            inProgress: true
                        },
                        {
                            position: 'Software Project Lead',
                            dates: 'Nov. 2023 - Jun. 2024',
                            description: [
                                "Led a team of 10 engineers and 5 designers to to create the The Student Activity Calendar, a Northeastern, student government backed project that aims to build a centralized tool for promoting involvement opportunities on campus.",
                                "Guided repository, schema and authentication design, CI/CD tooling, as well as database and language selection.",
                                "Conducted client interviews and user focus groups to ensure all features of the application are value additive."
                            ],
                            inProgress: false
                        },
                        {
                            position: 'Software Engineer - Voxeti',
                            dates: 'Sep. 2023 - Dec. 2023',
                            description: [
                                "Led the design and engineering of the frontend architecture, leveraging ReactJS and Redux as primary software solutions.",
                                "Co-developed an AWS-hosted microservice that exposes a 3D model slicing software through a Golang API.",
                                "Constructed 12 unique endpoints, including a file upload system that verifies the integrity of binary and ASCII .stl files before placing them in MongoDB blob storage."
                            ],
                            inProgress: false
                        },
                        {
                            position: 'Software Engineer - Boxy',
                            dates: 'Jan. 2023 - Apr. 2023',
                            description: [
                                "Part of an Agile team of engineers developing a mobile-friendly web-app for Boxy– a Northeastern based start-up.",
                                "Responsible for implementing scalable back-end architecture and developing a responsive front-end for desktop and mobile use.",
                                "Participated in weekly code reviews to assess my peers' outstanding pull requests and attend team-wide meetings to discuss design pivots and tackle blockers and/or development concerns."
                            ],
                            inProgress: false
                        }
                    ]}
                    skills={[
                        'NextJS', 'ReactJS', 'Redux', 'HTML', 'CSS', 'TypeScript', 'Golang', 'C++', 'Python', 'Postgres', 'MongoDB', 'Docker', 'AWS' 
                    ]}
                />
                <Card 
                    backgroundImage='https://i.imgur.com/4XwaPso.jpg'
                    logo='https://i.imgur.com/A990JUa.png'
                    position='Photographer'
                    dates='Sep. 2022 - Present' 
                    cursor='https://i.imgur.com/SfSmpRo.png'
                    link="https://www.tastemakersmag.com/"
                    description="Tastemakers Magazine exists to give Northeastern students a voice in the music industry and help members develop their craft."
                    experiences={[
                        {
                            position: 'Photographer',
                            dates: 'Sep. 2022 - Present',
                            description: [
                                "As a concert photographer, I am responsible for capturing and editing photos of artists at local venues for social media, the website, and magazine publication. All images are taken using a Sony A7iii.",
                            ],
                            inProgress: true
                        }
                    ]}
                />
                <Card 
                    backgroundImage='https://i.imgur.com/eqpNJeE.jpg'
                    logo='https://i.imgur.com/9OrIVkq.png'
                    position='Web Developer'
                    dates='Dec. 2023 - May 2024'
                    cursor='https://i.imgur.com/usBJmYm.png'
                    link="https://scout.camd.northeastern.edu/"
                    description="Scout is Northeastern's one and only student-led design studio. It is composed of a series of creative teams that work solely with clients from within the university's entrepreneurial ecostystem."
                    experiences={[
                        {
                            position: 'Web Developer',
                            dates: 'Dec. 2023 - May 2024',
                            description: [
                                "Co-developed an updated website for Scout. This project will be released at the end of August / beginning of September for public use to coincide with the launch of a wider rebrand.",
                            ],
                            inProgress: false
                        }
                    ]}
                    skills={[
                        'NextJS', 'HTML', 'CSS', 'TypeScript'
                    ]}
                />
                <Card 
                    backgroundImage='https://i.imgur.com/fCbFz8N.png'
                    logo='https://i.imgur.com/rOFQAMh.png'
                    position='Senior Associate'
                    dates='Jan. 2022 - Jan. 2024'
                    cursor='https://i.imgur.com/EzjoSBw.png'
                    link="https://huntingtonangelsnetwork.com/"
                    description="Huntington Angels Network (HAN) is a student-run organization whose mission is to grow the Northeastern venture community by connecting vetted and investment-ready start-ups to a global investor network of angel investors and venture capital firms. Since its foundation in 2017, the club has successfuly connected partnering ventures with $5.2 million in funding."
                    experiences={[
                        {
                            position: 'Senior Associate',
                            dates: 'Apr. 2023 - Jan. 2024',
                            description: [
                                "Lead 10+ calls per semester with founders of Northeastern affiliated start-ups and organize club-wide pitches.",
                                "Prepare 5+ pre-pitch due diligence forms and company one-pagers detailing venture finances, leadership, product, etc.",
                                "Offer feedback for 8+ start-up pitches per semester that targets both presentation and deck content.",
                                "Facilitate deal flow by connecting our partnered ventures with 3-5 potential investors with relevant investment theses."
                            ],
                            inProgress: false
                        },
                        {
                            position: 'Junior Associate',
                            dates: 'Jan. 2022 - April. 2023',
                            inProgress: false
                        }
                    ]}
                />
                <Card 
                    backgroundImage='https://i.imgur.com/oDeM93Y.jpg'
                    logo='https://i.imgur.com/E7gnkWQ.png'
                    position='Frontend Engineer Co-op'
                    dates='Jul. 2023 - Dec. 2023'
                    cursor='https://i.imgur.com/zudM8uM.png'
                    link="https://www.asicsdigital.com/"
                    description="ASICS Digital is a Boston-based company responsible for the continued development of ASICS's online platforms and services."
                    experiences={[
                        {
                            position: 'Frontend Engineer - Co-op',
                            dates: 'Jul. 2023 - Dec. 2023',
                            description: [
                                "Spearheaded transition of a component library to TypeScript, boosting frontend reliability across 36 unique items.",
                                "Led migration of an internal web-app responsible for servicing 20 million ASICS users to React 18, Material UI v5, Emotion CSS, and RTK Query to modernize the application and establish dependency uniformity across company ecosystem.",
                                "Developed and deployed a recurring CI/CD script that automates release package clean-up across all frontend repositories, immediately removing over 300 stale packages and ensuring future cost savings on cloud storage through future deletions.",
                                "Planned, designed, and engineered a web application and CLI tool that permits developers to create environment locks for extended testing periods, effectively eliminating harmful code overwrites causing release delays."
                            ],
                            inProgress: false
                        },
                    ]}
                    skills={['ReactJS', 'Redux', 'HTML', 'CSS', 'TypeScript', 'JavaScript', 'Scala', 'MongoDB', 'AWS']}
                />
                <Card 
                    backgroundImage='https://i.imgur.com/A6Wc8oR.jpg'
                    logo='https://i.imgur.com/u17e8mn.png'
                    position='Digital Developer Co-op'
                    dates='Jul. 2022 - Dec. 2022'
                    cursor='https://i.imgur.com/VND1Xk0.png'
                    link="https://www.mfs.com/corporate/en/home.html"
                    description="MFS Investment Management is an American-based global investment manager, formerly known as Massachusetts Financial Services. Founded in 1924, MFS is one of the oldest asset management companies in the world and has been credited with pioneering the mutual fund."
                    experiences={[
                        {
                            position: 'Digital Developer Engineer - Co-op',
                            dates: 'Jul. 2022 - Dec. 2022',
                            description: [
                                "Established an Azure Data Factory pipeline to confirm file and meta-data transfers between Adobe Experience Manager and Seismic, automating a critical business report used to confirm information accessibility on over 10,000 documents.",
                                "Authored MFS’ first production Azure pipelines to de-silo over 12,000 documents containing present and historical data across 15 unique CVent REST endpoints.",
                                "Improved load time of the MFS website by ~10% using database indexes, overhauled hashing and equality methods, as well as optimized queries to enhance the website’s user experience.",
                                "Enhanced an existing Adobe Experience Platform, Azure workflow to bypass data upload size limitations and create a modularized version of the pipeline for general-use implementation, removing duplicate logic across 14 instances."
                            ],
                            inProgress: false
                        },
                    ]}
                    skills={['Java', 'Python', 'AZURE']}
                />
                <Card
                    backgroundImage='https://i.imgur.com/2EoWXS3.jpg'
                    logo='https://i.imgur.com/3iJe249.png'
                    position='Peer Tutor - Computer Science'
                    dates='Jan. 2022 - May. 2022'
                    cursor='https://i.imgur.com/GhF5yjd.png'
                    link="https://northeasternpeertutoring.sites.northeastern.edu/"
                    description="Northeastern University's Peer Tutoring program is a free service offered to all students. The program is designed to help students understand course material, improve study strategies, and develop problem-solving skills."
                    experiences={[
                        {
                            position: 'Peer Tutor',
                            dates: 'Jan. 2022 - May. 2022',
                            description: [
                                "Provided instruction to 20+ students seeking help for Northeastern’s Fundamentals of Computer Science 2.",
                                "Taught recursion, class/interface structure, JUnit testing, design patterns, and object oriented concepts in 56 sessions.",
                                "Demonstrated algorithms,  including Kruskal’s, Depth-First Search, and Breadth-First Search to introduce graph theory.",
                            ],
                            inProgress: false
                        },
                    ]}
                    skills={['Java']}
                />
           </div>
        </section>
    );
}