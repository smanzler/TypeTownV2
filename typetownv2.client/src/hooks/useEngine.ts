import { useCallback, useEffect, useState } from "react";
import { debug } from "../utils/helpers";
import useCounter from "./useCounter";
import useTypings from "./useTypings";

export type State = "start" | "run" | "finish";

const useEngine = (content: string) => {
    const [state, setState] = useState<State>("start");
    const [wpm, setWpm] = useState(0);
    const { timeElapsed, startCounter, resetCounter, stopCounter } =
        useCounter();
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
        state !== "finish"
    );

    useEffect(() => {
        setWpm(Math.round(totalTyped * 12 / timeElapsed));
    }, [timeElapsed])
    

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = cursor === content?.length;

    const restart = useCallback(() => {
        debug("restarting...");
        resetCounter();
        resetTotalTyped();
        setState("start");
        clearTyped();
    }, [clearTyped, resetCounter, resetTotalTyped]);

    // as soon the user starts typing the first letter, we start
    useEffect(() => {
        if (isStarting) {
            setState("run");
            resetCounter();
            startCounter();
        }
    }, [isStarting, resetCounter, startCounter]);

    // when the time is up, we've finished

    /**
     * when the current words are all filled up,
     * we generate and show another set of words
     */
    useEffect(() => {
        if (areWordsFinished) {
            debug("words are finished...");
            clearTyped();
            stopCounter();
            setState("finish");
        }
    }, [clearTyped, areWordsFinished, stopCounter]);
    
    
    return { state, content , typed, restart, timeElapsed, wpm };
};

export default useEngine;
