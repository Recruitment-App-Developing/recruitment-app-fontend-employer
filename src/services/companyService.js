import axiosInstance from '../utils/axiosInstance';

export const fetchListCompanyForEmployer = async (pageSize = 6) => {
    const res = await axiosInstance.get(
        `/company/employer?pageSize=${pageSize}&sortDir=desc`,
    );
    return res.data;
};

export const fetchAddCompany = async (data) => {
    const res = await axiosInstance.post(`company/add`, data);
    return res.data;
};

export const fetchMyCompany = async () => {
    const res = await axiosInstance.get(`company/my-company`);
    return res.data;
};
