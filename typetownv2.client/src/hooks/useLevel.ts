import { useState } from 'react';

interface Text {
    id: number;
    textContent: string;
    difficulty: number;
    name: string;
}

const useLevel = () => {
    const [text, setText] = useState<string>('Please select a level below'); // Set initial state to an empty string

    const getLevel = async (id: number) => {
        try {
            const response = await fetch('text/' + id);
            if (!response.ok) {
                throw new Error('Failed to fetch level data');
            }
            const data: Text = await response.json();
            setText(data.textContent); // Set the state with the fetched text content
        } catch (error) {
            console.error('Error fetching level:', error);
        }
    };

    return { text, getLevel }; // Return text state and getLevel function
}

export default useLevel;
