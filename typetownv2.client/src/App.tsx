import React from "react";
import RestartButton from "./components/RestartButton";
import Results from "./components/Results";
import Levels from "./components/Levels";
import UserTypings from "./components/UserTypings";
import useEngine from "./hooks/useEngine";
import useLevel from "./hooks/useLevel";
import useLevels from "./hooks/useLevels";

const App = () => {
    const text = useLevel(1);
    const textContent = text?.textContent === undefined ? " " : text?.textContent;

    const { content, typed, timeElapsed, state, restart, wpm } =
        useEngine(textContent);



    return (
        <>
            <CountdownTimer timeLeft={timeElapsed} />
            <WordsPerMin wpm={wpm} />
            <WordsContainer>
                <UserTypings
                    className=" break-keep"
                    words={content}
                    userInput={typed}
                />
            </WordsContainer>
            <RestartButton
                className={"mx-auto mt-10 text-slate-500"}
                onRestart={restart}
            />
            <Results
                className="mt-10"
                state={state}
                time={timeElapsed}
            />
            <Levels
                allLevels={useLevels()}
            />
        </>
    );
};

const WordsContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative text-3xl max-w-xl leading-relaxed break-all mt-3">
            {children}
        </div>
    );
};

const CountdownTimer = ({ timeLeft }: { timeLeft: number }) => {
    return <h2 className="text-primary-400 font-medium">Time: {timeLeft}</h2>;
};

const WordsPerMin = ({ wpm }: { wpm: number }) => {
    return <h2 className="text-primary-400 font-medium justify=items-end">WPM: {wpm}</h2>;
}

export default App;

