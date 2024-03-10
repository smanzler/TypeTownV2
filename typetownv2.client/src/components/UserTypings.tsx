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
                <div key={`${word}_${wIndex}`} id="word" className="inline-block m-2 relative">
                    {currentWordIndex === wIndex && <Caret position={currentWordLength} />}
                    {word.split("").map((char, cIndex) => (
                        <Character
                            key={`${char}_${cIndex}`}
                            actual={splitInput[wIndex]?.[cIndex]}
                            expected={char}
                        />
                    ))}
                    {(splitInput[wIndex] ?? "")
                        .substring(splitWords[wIndex].length)
                        .split("")
                        .map((char, index) => (
                            <ExtraCharacter
                                index={index}
                                char={char}
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

const ExtraCharacter = ({
    char,
    index,
}: {
    char: string;
        index: number;
    }) => {
    return (
        <span
            className="text-red-900"
            key={`extra_${index}`}
            id="letter"
        >
            {char}
        </span>
    )
}

export default UserTypings;