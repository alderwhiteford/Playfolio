import { Dispatch, SetStateAction, useState } from "react";
import EastIcon from '@mui/icons-material/East';

type LinkProps = {
	title: string
	onClick: (type: string) => void
}

export default function Link({ title, onClick } : LinkProps) {
	const [hover, setHover] = useState(false);

	return (
		<div className='flex flex-row justify-end gap-x-2 items-center'>
			{hover &&
				<EastIcon className='animate-fadeIn text-[#FFAE42]' />
			}
			<div
				className={`hover:cursor-pointer hover:text-[#FFAE42] hover:text-[32px] transition-all ease-in-out`}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
				onClick={() => onClick(title)}
			>
				{title}
			</div>
		</div>
	);
}