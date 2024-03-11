import { useCallback, useEffect, useState } from "react";
import useCounter from "./useCounter";
import useTypings from "./useTypings";
import useLevel from "./useLevel";

export type State = "start" | "run" | "finish";

const useEngine = () => {
    const [state, setState] = useState<State>("start");
    const [wpm, setWpm] = useState(0);

    // gets functions from other hooks to use
    const { text, getLevel } = useLevel();
    const { timeElapsed, startCounter, resetCounter, stopCounter } =
        useCounter();
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
        state !== "finish", text.split(" ").length
    );

    // sets words per minute, only updated every second
    useEffect(() => {
        setWpm(Math.round(totalTyped * 12 / timeElapsed));
    }, [timeElapsed]);

    // starts when user makes the first input
    const isStarting = state === "start" && cursor > 0;

    const splitText = text.split(" ");
    const splitTextLength = splitText.length - 1;
    // checks if the last word in the text has been typed
    const areWordsFinished = splitText[splitTextLength].length === (
        typed.split(" ").length > splitTextLength ?
            typed.split(" ")[splitTextLength].length : 0
    );

    // restarts everything
    const restart = useCallback(() => {
        resetCounter();
        resetTotalTyped();
        setState("start");
        clearTyped();
    }, [clearTyped, resetCounter, resetTotalTyped]);

    // sets the level based on which level is selected
    const setLevel = useCallback(async (id: number) => {
        restart();
        await getLevel(id);
    }, [getLevel, restart])

    // starts
    useEffect(() => {
        if (isStarting) {
            setState("run");
            resetCounter();
            startCounter();
        }
    }, [isStarting, resetCounter, startCounter]);

    // finish
    useEffect(() => {
        if (areWordsFinished) {
            stopCounter();
            setState("finish");
        }
    }, [clearTyped, areWordsFinished, stopCounter]);
    
    
    return { state, text , typed, restart, timeElapsed, wpm, setLevel };
};

export default useEngine;
