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
