import axiosInstance from '../utils/axiosInstance';

export const fetchMyAccount = async () => {
    const res = await axiosInstance.get(`employer/my-account`);
    return res.data;
};

export const fetchUpdateAccount = async (data) => {
    const res = await axiosInstance.put(`employer/update`, data);
    return res.data;
};

export const fetchRegisterCompany = async (compnayId) => {
    const res = await axiosInstance.patch(
        `employer/register-company/${compnayId}`,
    );
    return res.data;
};
