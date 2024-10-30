import axiosInstance from '../utils/axiosInstance';

export const fetchRegisterCompany = async (compnayId) => {
    const res = await axiosInstance.patch(
        `employer/register-company/${compnayId}`,
    );
    return res.data;
};
