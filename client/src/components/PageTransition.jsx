import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const variants = {
    initial: {
        x: 60,          // slide from right
        opacity: 0
    },
    animate: {
        x: 0,
        opacity: 1
    },
    exit: {
        x: -60,         // slide to left
        opacity: 0
    }
};

export default function PageTransition({ children }) {
    const navigate = useNavigate();

    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.45,
                ease: [0.4, 0, 0.2, 1] // smooth on all devices
            }}
            style={{
                width: "100%"
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(e, info) => {
                // Placeholder for gesture navigation
                // if (info.offset.x < -100) navigate("/next");
                // if (info.offset.x > 100) navigate("/prev");
            }}
        >
            {children}
        </motion.div>
    );
}
