import { ReactNode, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

type RevealProps = {
	children: ReactNode
	width?: 'fit-content' | '100%'
	box?: boolean
	type?: 'top' | 'left' | 'bottom' | 'right'
}

export default function Reveal({ children, width = 'fit-content', box = true, type='left' } : RevealProps) {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const mainControls = useAnimation();
	const slideControls = useAnimation();

	useEffect(() => {
		if (isInView) {
			mainControls.start("visible")
			slideControls.start("visible")
		}
	}, [isInView])

	const boxTypes = {
		left: {
			hidden: { left: 0 },
			visible: { left: '100%' },
		},
		top: {
			hidden: { top: 0 },
			visible: { top: '100%' },
		},
		bottom: {
			hidden: { bottom: 0 },
			visible: { bottom: '100%' },
		},
		right: {
			hidden: { right: 0 },
			visible: { right: '100%' },
		},
	}

	return (
		<div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
			<motion.div
				variants={{
						hidden: { opacity: 0, y: 75 },
						visible: { opacity: 1, y: 0 },
				}}
				initial="hidden"
				animate={mainControls}
				transition={{ duration: 0.5, delay: 0.25 }}
			>
				{children}
			</motion.div>
			{box &&
				<motion.div
					variants={boxTypes[type]}
					initial='hidden'
					animate={slideControls}
					transition={{ duration: 0.5, ease: 'easeIn' }}
					style={{
						position: 'absolute',
						top: 50,
						bottom: 4,
						left: 0,
						right: 0,
						zIndex: 20,
						backgroundColor: '#FFAE42'
					}}
				/>
			}				
		</div>
	);
}