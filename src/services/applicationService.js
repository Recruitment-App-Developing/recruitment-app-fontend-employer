import axiosInstance from '../utils/axiosInstance';

export const fetchStatisticCvByCompany = async () => {
    const res = await axiosInstance.get(`application/statistic-cv-by-company`);
    return res.data;
};

export const fetchAppliedCandidateByJob = async (
    jobId,
    pageSize = 3,
    currentPage = 0,
) => {
    const res = await axiosInstance.get(
        `application/applied-candidate-by-job/${jobId}?pageSize=${pageSize}&currentPage=${currentPage}`,
    );
    return res.data;
};

export const fetchSearchCandidateByJob = async (
    jobId,
    condition,
    currentPage = 0,
    pageSize = 3,
) => {
    const res = await axiosInstance.get(
        `application/search-candidate/${jobId}?pageSize=${pageSize}&currentPage=${currentPage}&${condition}`,
    );
    return res.data;
};
