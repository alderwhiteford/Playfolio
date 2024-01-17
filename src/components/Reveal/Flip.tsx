import { ReactNode, useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

type FlipProps = {
    children: ReactNode
}

export default function Flip({ children } : FlipProps) {
    const ref = useRef(null);
	const isInView = useInView(ref, { once: true });
	const mainControls = useAnimation();

    useEffect(() => {
		if (isInView) {
			mainControls.start("visible")
		}
	}, [isInView])

    return (
        <div ref={ref} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            <motion.div
				variants={{
						hidden: { opacity: 0, transform: 'rotateX(-45deg)' },
						visible: { opacity: 1, transform: 'rotateX(0deg)' },
				}}
				initial="hidden"
				animate={mainControls}
				transition={{ duration: 1, delay: 0.35 }}
			>
                {children}
            </motion.div>
        </div>
    );
}
