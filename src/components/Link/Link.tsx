import { Dispatch, SetStateAction } from "react";
import EastIcon from '@mui/icons-material/East';

type LinkProps = {
	title: string
	setHoveredItem: Dispatch<SetStateAction<string>>
	hoveredItem: string
}

export default function Link({ title, setHoveredItem, hoveredItem } : LinkProps) {
	return (
		<div className='flex flex-row justify-end gap-x-2 items-center'>
			<EastIcon className={`${hoveredItem !== title ? 'hidden' : '' } animate-fadeIn text-[#FFAE42]`}/>
			<div
				className={`hover:cursor-pointer hover:text-[#FFAE42] hover:text-[32px] transition-all ease-in-out`}
				onMouseEnter={() => setHoveredItem(title)}
				onMouseLeave={() => setHoveredItem('')}
			>
				{title}
			</div>
		</div>
	);
}