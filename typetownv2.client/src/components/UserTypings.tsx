import cn from "classnames";
import Caret from "./Caret";

const UserTypings = ({
    userInput,
    cursorIndex,
    wordIndex,
    words,
    className = "",
}: {
    userInput: string;
    cursorIndex: number;
    wordIndex: number;
    words: string;
    className?: string;
    }) => {
    const splitInput = userInput.split(" ");
    const splitWords = words.split(" ");

    return (
        <div className={className}>
            {splitWords.map((word, wIndex) => (
                <div key={`${word}_${wIndex}`} id="word" className="inline-block m-2">
                    {word.split("").map((char, index) => (
                        <Character
                            key={`${char}_${index}`}
                            actual={splitInput && splitInput[wIndex] && splitInput[wIndex][index]}
                            expected={char}
                        />

                    ))}
                </div>
            ))}
        </div>
    );
};

const Character = ({
    actual,
    expected,
}: {
    actual: string;
    expected: string;
    }) => {


    const inputExists = !!actual;
    const isCorrect = actual === expected;
    const isWhiteSpace = expected === " ";

    return (
        <span
            className={inputExists ? cn({
                "text-red-600": !isCorrect && !isWhiteSpace,
                "text-slate-100": isCorrect && !isWhiteSpace,
                "bg-red-500/50": !isCorrect && isWhiteSpace,
            }) : ""}

        >
            {actual || expected}
        </span>
    );
};

export default UserTypings;