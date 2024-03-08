import { useCallback, useEffect, useRef, useState } from "react";

const useTypings = (enabled: boolean) => {
    const [cursor, setCursor] = useState(0);
    const [cursorLocation, setCursorLocation] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);

    // handles when a key is pressed
    const keydownHandler = useCallback(
        ({ key }: KeyboardEvent) => {

            // filters out the unnecessary keys
            if (!enabled || (key !== "Backspace" && key.length > 1)) {
                return;
            }

            switch (key) {
                case "Backspace":
                    // moves everything backwards
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor((cursor) => Math.max(0, cursor - 1));
                    totalTyped.current = Math.max(0, totalTyped.current - 1);
                    break;
                case " ":
                    // checks if the last typed letter was a space
                    if (!typed.length || typed[typed.length - 1] === " ") {
                        break;
                    }
                    // jumps to the next word
                    setTyped((prev) => prev.concat(" "));
                    setCursorLocation(0);
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
                    break;
                default:
                    // moves everything forward
                    setTyped((prev) => prev.concat(key));
                    setCursorLocation((location) => location + 1);
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [enabled, typed]
    );

    useEffect(() => {
        console.log(enabled);
    }, [enabled])

    // clears user input buffer
    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
        setCursorLocation(0);
    }, []);

    // resets the count
    const resetTotalTyped = useCallback(() => {
        totalTyped.current = 0;
    }, []);

    // attach the keydown event listener to record keystrokes
    useEffect(() => {
        window.addEventListener("keydown", keydownHandler);
        // remove event listeners on cleanup
        return () => {
            window.removeEventListener("keydown", keydownHandler);
        };
    }, [keydownHandler]);

    // removed the action of jolting down the page on the space key press
    window.addEventListener('keydown', function (e) {
        if (e.keyCode == 32 && e.target == document.body) {
            e.preventDefault();
        }
    });

    return {
        typed,
        cursor,
        cursorLocation,
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
};

export default useTypings;