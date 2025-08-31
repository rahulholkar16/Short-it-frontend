export const API_CONNECTION = async (url, option) => {
    try {
        const data = await fetch('url', option);
        return data;
    } catch (error) {
        console.log(error);
        return error
    }
}