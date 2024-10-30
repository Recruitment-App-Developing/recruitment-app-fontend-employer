import axiosInstance from '../utils/axiosInstance';

export const fetchLogin = async (data) => {
    const res = await axiosInstance.post(`auth/login`, data);
    return res.data;
};

export const fetchRegisterEmployer = async (data) => {
    const res = await axiosInstance.post(`employer/register`, data);
    return res.data;
};
