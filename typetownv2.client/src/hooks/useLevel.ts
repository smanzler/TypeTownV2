import { useState } from 'react';

interface Text {
    id: number;
    textContent: string;
    difficulty: number;
    name: string;
}

const useLevel = () => {
    const [text, setText] = useState<string>('Please select a level below'); // set initial text when no level is selected yet

    // fetches the content based on the id
    const getLevel = async (id: number) => {
        try {
            const response = await fetch('text/' + id);
            if (!response.ok) {
                throw new Error('Failed to fetch level data');
            }
            const data: Text = await response.json();
            setText(data.textContent);
        } catch (error) {
            console.error('Error fetching level:', error);
        }
    };

    return { text, getLevel };
}

export default useLevel;
