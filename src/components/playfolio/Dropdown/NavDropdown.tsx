import { SectionProps } from '@/pages';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { LINKS, scrollOnClick } from '@/sections/portfolio/Landing';
import Link from '@/components/playfolio/Link/Link';

type NavDropdownProps = {
    isVisible: boolean
}

export default function NavDropdown({ isVisible, cursorEnter, cursorLeave }: NavDropdownProps & SectionProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div 
                className={`right-8 top-8 md:right-16 md:top-16 fixed z-40 ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} ${isOpen ? 'rotate-90' : 'rotate-0'} transition-all ease-in-out`}
                onMouseOver={cursorEnter}
                onMouseLeave={cursorLeave}
                onClick={() => setIsOpen(!isOpen)}
            >
                <MenuIcon sx={{ color: 'white' }} fontSize={'large'}/>
            </div>
            <div className={`${isOpen && isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'} p-6 fixed z-40 right-8 top-20 md:right-16 md:top-28 bg-black bg-opacity-60 text-white border-white border-[1px] rounded-2xl flex flex-col items-end justify-center text-2xl font-thin`}>
                {LINKS.map((link) => {
                    return (
                        <Link 
                            key={link}
                            title={link}
                            onClick={scrollOnClick}
                            cursorEnter={cursorEnter}
                            cursorLeave={cursorLeave}
                        >
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}