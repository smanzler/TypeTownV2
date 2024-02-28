import { useState, useEffect } from 'react';

interface Text {
    id: number;
    textContent: string;
    difficulty: number;
    name: string;
}

const useLevels = () => {
    const [text, setText] = useState<Text[]>();

    useEffect(() => {
        getAllLevels();
    }, []); 

    async function getAllLevels() {
        const response = await fetch('text');
        const data = await response.json();
        setText(data);
    }
    return text;
}

export default useLevels;