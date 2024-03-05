// accept only letters and whitespaces
export const isKeyboardCodeNotAllowed = (code: string) => {
    return (
        code.startsWith("Shift")
    );
};


export const debug = (str: string) => {
    if (process.env.NODE_ENV === "development") {
        console.debug(str);
    }
};
