import axiosInstance from '../utils/axiosInstance';

export const fetchStatistcGeneralJobByIndustry = async () => {
    const res = await axiosInstance.get(
        `statistic/statistcGeneralJobByIndustry`,
    );
    return res.data;
};

export const fetchStatisticGeneralJobByDay = async () => {
    const res = await axiosInstance.get(`statistic/statisticGeneralJobByDay`);
    return res.data;
};

export const fetchStatisticCompanyJobByIndustry = async () => {
    const res = await axiosInstance.get(
        `statistic/statisticCompanyJobByIndustry`,
    );
    return res.data;
};

export const fetchStatisticApplicationStatusByCompany = async () => {
    const res = await axiosInstance.get(
        `statistic/statisticApplicationStatusByCompany`,
    );
    return res.data;
};

export const fetchStatisticApplyCandidateByDay = async () => {
    const res = await axiosInstance.get(
        `statistic/statisticApplyCandidateByDay`,
    );
    return res.data;
};
