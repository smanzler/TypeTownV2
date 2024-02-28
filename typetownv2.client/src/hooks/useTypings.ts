import { useCallback, useEffect, useRef, useState } from "react";
import { isKeyboardCodeNotAllowed } from "../utils/helpers"

const useTypings = (enabled: boolean) => {
    const [cursor, setCursor] = useState(0);
    const [typed, setTyped] = useState<string>("");
    const totalTyped = useRef(0);

    const keydownHandler = useCallback(
        ({ key, code }: KeyboardEvent) => {
            if (!enabled || isKeyboardCodeNotAllowed(code)) {
                console.log(code);
                return;
            }
            switch (key) {
                case "Backspace":
                    setTyped((prev) => prev.slice(0, -1));
                    setCursor((cursor) => Math.max(0, cursor - 1));
                    totalTyped.current = Math.max(0, totalTyped.current - 1);
                    break;
                default:
                    setTyped((prev) => prev.concat(key));
                    setCursor((cursor) => cursor + 1);
                    totalTyped.current += 1;
            }
        },
        [enabled]
    );

    const clearTyped = useCallback(() => {
        setTyped("");
        setCursor(0);
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
        clearTyped,
        resetTotalTyped,
        totalTyped: totalTyped.current,
    };
};

export default useTypings;
