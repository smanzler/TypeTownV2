import { useState, useEffect } from 'react';

interface Text {
    id: number;
    textContent: string;
    difficulty: number;
    name: string;
}

const useLevel = ( ID: number) => {
    const [text, setText] = useState<Text>();

    useEffect(() => {
        getLevel();
    }, []);

    async function getLevel() { 
        const response = await fetch('text/' + ID);
        const data = await response.json();
        setText(data);
    }
    return text;
}

export default useLevel;