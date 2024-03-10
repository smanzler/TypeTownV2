import { motion } from "framer-motion";

const Caret = ({
    position,
}: {
    position: number;
}) => {
    return (
        <motion.div
            aria-hidden={true}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 1 }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="absolute bg-blue-500 w-0.5 h-8"
            style={{ left: `${position * 18.8}px`, top: 7 }}
        />
    );
};

export default Caret;
