const ACCESS_TOKEN = 'access_token';

export const setToken = (token) => {
    localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
    return localStorage.getItem(ACCESS_TOKEN);
};

export const deleteToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
};
