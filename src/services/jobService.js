import axiosInstance from '../utils/axiosInstance';

export const fetchListJobByCompany = async (
    pageSize = 5,
    currentPage = 0,
    orderBy = 'id',
    orderDir,
) => {
    const res = await axiosInstance.get(
        `job/byCompany?pageSize=${pageSize}&currentPage=${currentPage}&sortDir=${orderDir}&sortField=${orderBy}`,
    );
    return res.data;
};

export const fetchDetailJobById = async (jobId) => {
    const res = await axiosInstance.get(`job/${jobId}`);
    return res.data;
};

export const fetchEditJob = async (jobId, data) => {
    const res = await axiosInstance.post(`job/update/${jobId}`, data);
    return res.data;
};

export const fetchListJobAddressByJob = async (jobId) => {
    const res = await axiosInstance.get(`job/job-address/${jobId}`);
    return res.data;
};

export const fetchAddJob = async (data) => {
    const res = await axiosInstance.post(`job`, data);
    return res.data;
};

export const fetchUpdJobAddress = async (jobId, data) => {
    const res = await axiosInstance.post(
        `job/job-address/update/${jobId}`,
        data,
    );
    return res.data;
};

export const fetchDeleteJobAddress = async (jobId, jobAddressId) => {
    const res = await axiosInstance.delete(
        `job/job-address/delete/${jobId}?job_address_id=${jobAddressId}`,
    );
    return res.data;
};
