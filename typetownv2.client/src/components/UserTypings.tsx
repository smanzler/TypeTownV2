import React from "react";
import Caret from "../components/Caret"
import cn from "classnames";

const UserTypings = ({
    userInput,
    words,
    className = "",
}: {
    userInput: string;
    words: string;
    className?: string;
}) => {
    const splitInput = userInput.split(" ");
    const splitWords = words.split(" ");

    // Determine caret position
    const currentWordIndex = splitInput.length - 1;
    const currentWordLength = splitInput[currentWordIndex]?.length || 0;

    return (
        <div className={className}>
            {splitWords.map((word, wIndex) => (
                <React.Fragment key={`${word}_${wIndex}`}>
                    <div id="word" className="inline-block m-2">
                        {word.split("").map((char, index) => (
                            <Character
                                key={`${char}_${index}`}
                                actual={splitInput[wIndex]?.[index]}
                                expected={char}
                            />
                        ))}
                    </div>
                </React.Fragment>
            ))}
        </div>
    );
};

const Character = ({
    actual,
    expected,
}: {
    actual: string | undefined;
    expected: string;
}) => {
    const inputExists = !!actual;
    const isCorrect = actual === expected;
    const isWhiteSpace = expected === " ";

    return (
        <span
            className={cn({
                "text-red-500": inputExists && !isCorrect && !isWhiteSpace,
                "text-slate-100": inputExists && isCorrect && !isWhiteSpace,
                "bg-red-500/50": inputExists && !isCorrect && isWhiteSpace,
            })}
        >
            {expected}
        </span>
    );
};

export default UserTypings;