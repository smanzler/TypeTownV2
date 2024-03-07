
export const debug = (str: string) => {
    if (process.env.NODE_ENV === "development") {
        console.debug(str);
    }
};
