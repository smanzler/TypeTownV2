import { useCallback, useEffect, useState } from "react";
import useCounter from "./useCounter";
import useTypings from "./useTypings";
import useLevel from "./useLevel";

export type State = "start" | "run" | "finish";

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const [wpm, setWpm] = useState(0);
    const { text, getLevel } = useLevel();

    const { timeElapsed, startCounter, resetCounter, stopCounter } =
        useCounter();
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
        state !== "finish"
    );

    useEffect(() => {
        console.log(text);
    }, [text]);

    useEffect(() => {
        setWpm(Math.round(totalTyped * 12 / timeElapsed));
    }, [timeElapsed]);

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = cursor === text.length;

    const restart = useCallback(() => {
        resetCounter();
        resetTotalTyped();
        setState("start");
        clearTyped();
    }, [clearTyped, resetCounter, resetTotalTyped]);

    const setLevel = useCallback(async (id: number) => {
        restart();
        await getLevel(id);
    }, [getLevel, restart])

    useEffect(() => {
        if (isStarting) {
            setState("run");
            resetCounter();
            startCounter();
        }
    }, [isStarting, resetCounter, startCounter]);

    useEffect(() => {
        if (areWordsFinished) {
            clearTyped();
            stopCounter();
            setState("finish");
        }
    }, [clearTyped, areWordsFinished, stopCounter]);
    
    
    return { state, text , typed, restart, timeElapsed, wpm, setLevel };
};

export default useEngine;
