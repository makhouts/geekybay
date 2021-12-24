import { motion } from "framer-motion";

const animations = {
    initial: { opacity: 0, scale: 0.80 },
    animate: { opacity: 1,  scale: 1 },
    exit: { opacity: 0, y: 30, ease: "easeInOut" }
};

export const PageTransition = ({children}) => {
    return (
        <motion.div
            variants={animations}
            initial='initial'
            animate='animate'
            exit='exit'
        >
            {children}
        </motion.div>
    )
}