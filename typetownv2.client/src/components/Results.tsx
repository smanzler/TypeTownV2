import { motion } from "framer-motion";
import { State } from "../hooks/useEngine";

const Results = ({
    state,
    time,
    className = "",
}: {
    state: State;
    time: number;
    className?: string;
}) => {
    if (state !== "finish") {
        return null;
    }

    const initial = { opacity: 0 };
    const animate = { opacity: 1 };

    return (
        <motion.ul
            initial={initial}
            animate={animate}
            className={`flex flex-col items-center text-primary-400 space-y-3 ${className}`}
        >
            <motion.li
                initial={initial}
                animate={animate}
                transition={{ duration: 0.3 }}
                className="text-xl font-semibold"
            >
                Results
            </motion.li>
            <motion.li
                initial={initial}
                animate={animate}
                transition={{ duration: 0.3, delay: 0.7 }}
            >
                Time: {time}
            </motion.li>
        </motion.ul>
    );
};

export default Results;
