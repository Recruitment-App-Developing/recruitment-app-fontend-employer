import axiosInstance from '../utils/axiosInstance';
import { deleteToken } from '../utils/storageUtil';

export const fetchLogin = async (data) => {
    deleteToken();

    const res = await axiosInstance.post(`auth/login`, data);
    return res.data;
};

export const fetchRegisterEmployer = async (data) => {
    deleteToken();

    const res = await axiosInstance.post(`employer/register`, data);
    return res.data;
};

export const fetchChangePassword = async (data) => {
    const res = await axiosInstance.post(`auth/change-password`, data);
    return res.data;
};
