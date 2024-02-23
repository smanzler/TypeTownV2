import { useState, useEffect } from 'react';

interface Text {
    id: number;
    textContent: string;
    difficulty: number;
}

const useLevel = ( ID: number) => {
    const [text, setText] = useState<Text>();

    useEffect(() => {
        populateData();
    });

    async function populateData() { 
        const response = ID === 0 ? await fetch('text') : await fetch('text/' + ID);
        const data = await response.json();
        setText(data);
    }
    return text;
}

export default useLevel;