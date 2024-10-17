import axiosInstance from '../utils/axiosInstance';

export const fetchStatisticCvByCompany = async () => {
    const res = await axiosInstance.get(`application/statistic-cv-by-company`);
    return res.data;
};

export const fetchAppliedCandidateByJob = async (jobId) => {
    const res = await axiosInstance.get(
        `application/applied-candidate-by-job/${jobId}`,
    );
    return res.data;
};
