import { useCallback, useEffect, useRef, useState } from "react";

const useCounter = () => {
    const [timeElapsed, setTimeElapsed] = useState(0);
    const intervalRef = useRef<NodeJS.Timer | null>(null);
    const isRunning = intervalRef.current != null;

    const startCounter = useCallback(() => {
        if (!isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeElapsed((prevTime) => prevTime + 1);
            }, 1000);
        }
    }, [setTimeElapsed, isRunning]);

    const resetCounter = useCallback(() => {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setTimeElapsed(0);
    }, []);

    // when the countdown reaches 0, clear the countdown interval


    // clear interval when component unmounts
    useEffect(() => {
        return () => clearInterval(intervalRef.current!);
    }, []);

    return { timeElapsed, startCounter, resetCounter };
};

export default useCounter;
