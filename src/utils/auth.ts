export const getAuthToken = (): string => {
    // Logic to retrieve or generate the authentication token
    return process.env.TRELLO_API_KEY || '';
};

export const isAuthenticated = (): boolean => {
    // Logic to check if the user is authenticated
    return !!getAuthToken();
};