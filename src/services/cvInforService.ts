import { DetailCvInfor } from '../pages/CvInfoManagement/cvInforType';
import axiosInstance from '../utils/axiosInstance';

export const fetchDetailCvInfor = async (cvInforId: string) => {
    const res = await axiosInstance.get(`cv-info/get-detail/${cvInforId}`);
    return res.data;
};

export const fetchListCvInfor = async () => {
    const res = await axiosInstance.get(`cv-info/get-list`);
    return res.data;
};

export const fetchUploadCv = async (formData: FormData) => {
    const res = await axiosInstance.post(`employer/upload-file`, formData, {
        headers: {},
    });

    return res;
};

export const fetchUpdateCvInfo = async (data: DetailCvInfor) => {
    const res = await axiosInstance.post(`cv-info/update`, data);
    return res;
};

export const fetchGetAwardAuditById = async (id: string | null) => {
    const res = await axiosInstance.get(`cv-info/audit/award/${id}`);
    return res;
};

export const fetchGetAwardAuditByCvInfoId = async (cvInfoId: string | null) => {
    const res = await axiosInstance.get(
        `cv-info/audit/by-cv-info/award/${cvInfoId}`,
    );
    return res;
};
