import { useCallback, useEffect, useRef, useState } from "react";

const useTypings = (enabled: boolean) => {
    const [cursor, setCursor] = useState(0);
    const [word, setWord] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        ({ key }: KeyboardEvent) => {
            console.log("Key: " + key); 

            if (!enabled || (key !== "Backspace" && key.length > 1)) {
                return;
            }
            switch (key) {
                case "Backspace":
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor((cursor) => Math.max(0, cursor - 1));
                    totalTyped.current = Math.max(0, totalTyped.current - 1);
                    break;
                case " ":
                    if (cursor > 0) {
                        setTyped((prev) => prev.concat(key));
                        setCursor((cursor) => cursor + 1);
                        setWord((word) => word + 1)
                        totalTyped.current += 1;
                    }
                    break;
                default:
                    setTyped((prev) => prev.concat(key));
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [cursor, enabled]
    );

    useEffect(() => {
        console.log(enabled);
    }, [enabled])

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
        setWord(0);
    }, []);

    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    // attach the keydown event listener to record keystrokes
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);
        // Remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    });

    return {
        typed,
        cursor,
        word,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
};

export default useTypings;