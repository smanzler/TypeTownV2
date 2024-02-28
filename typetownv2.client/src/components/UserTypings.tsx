import cn from "classnames";
import Caret from "./Caret";

const UserTypings = ({
    userInput,
    words,
    className = "",
}: {
    userInput: string;
    words: string;
    className?: string;
}) => {
    const typedCharacters = userInput.split("");


    const splitWords = words.split("");

    return (
        <div className={className}>
            {splitWords.map((char, index) => (
                <Character
                    key={`${char}_${index}`}
                    actual={typedCharacters[index]}
                    expected={char}
                    index={index}
                    length={typedCharacters.length}
                />
            ))}
        </div>
    );
};

const Character = ({
    actual,
    expected,
    index,
    length,
}: {
    actual: string;
    expected: string;
    index: number;
    length: number;
}) => {
    const isCorrect = actual === expected;
    const isWhiteSpace = expected === " ";

    return (
        <span 
            className={index >= length ? "" : cn({
                "text-red-500": !isCorrect && !isWhiteSpace,
                "text-primary-400": isCorrect && !isWhiteSpace,
                "bg-red-500/50": !isCorrect && isWhiteSpace,
            })}
            
        >
            {index === length && <Caret />}
            {expected}
        </span>
    );
};

//<div className={className}>
//    {splitWords.map((word) => (
//        <div id="word" className="inline-block m-2">
//            {word.split("").map((char, index) => (
//                <span id="letter">{char}</span>
//            ))}
//        </div>
//    ))}
//</div>


export default UserTypings;
