import { useCallback, useEffect, useState } from "react";
import { countErrors, debug } from "../utils/helpers";
import useCounter from "./useCounter";
import useTypings from "./useTypings";
/*import useWords from "./useWords";*/

export type State = "start" | "run" | "finish";

const useEngine = (content: string) => {
    const [state, setState] = useState<State>("start");
    const [wpm, setWpm] = useState(0);
    const { timeElapsed, startCounter, resetCounter } =
        useCounter();
    /*const { words, updateWords } = useWords();*/
    const { cursor, typed, clearTyped, totalTyped, resetTotalTyped } = useTypings(
        state !== "finish"
    );
    const [errors, setErrors] = useState(0);

    const isStarting = state === "start" && cursor > 0;
    const areWordsFinished = cursor === content?.length;

    const restart = useCallback(() => {
        debug("restarting...");
        resetCounter();
        resetTotalTyped();
        setState("start");
        setErrors(0);
        clearTyped();
    }, [clearTyped, resetCounter, resetTotalTyped]);

    const sumErrors = useCallback(() => {
        debug(`cursor: ${cursor} - words.length: ${content.length}`);
        const wordsReached = content.substring(0, Math.min(cursor, content.length));
        setErrors((prevErrors) => prevErrors + countErrors(typed, wordsReached));
    }, [typed, content, cursor]);

    // as soon the user starts typing the first letter, we start
    useEffect(() => {
        if (isStarting) {
            setState("run");
            startCounter();
        }
    }, [isStarting, startCounter]);

    // when the time is up, we've finished

    /**
     * when the current words are all filled up,
     * we generate and show another set of words
     */
    useEffect(() => {
        if (areWordsFinished) {
            debug("words are finished...");
            sumErrors();
            clearTyped();
            resetCounter();
            setState("finish");
        }
    }, [clearTyped, areWordsFinished, sumErrors, resetCounter]);
    
    
    return { state, content , typed, errors, restart, timeElapsed, totalTyped, wpm };
};

export default useEngine;
