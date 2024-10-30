import axiosInstance from '../utils/axiosInstance';

export const fetchListProvince = async () => {
    const res = await axiosInstance.get(`address/provinces`);
    return res.data;
};

export const fetchListDistrictByProvince = async (provinceId) => {
    const res = await axiosInstance.get(`address/districts/${provinceId}`);
    return res.data;
};

export const fetchListWardByDistrict = async (districtId) => {
    const res = await axiosInstance.get(`address/wards/${districtId}`);
    return res.data;
};
