import { useState, useEffect } from 'react';

interface Text {
    id: number;
    textContent: string;
    difficulty: number;
    name: string;
}

const useLevels = () => {
    const [text, setText] = useState<Text[]>();

    // gets all the levels when it mounts
    useEffect(() => {
        getAllLevels();
    }, []); 

    // sets the text interface to the values from the api
    async function getAllLevels() {
        try {
            const response = await fetch('text');
            if (!response.ok) {
                throw new Error('Failed to fetch level data');
            }
            const data: Text[] = await response.json();
            setText(data);
        } catch (error) {
            console.error('Error fetching level:', error);
        }
    }
    return text;
}

export default useLevels;