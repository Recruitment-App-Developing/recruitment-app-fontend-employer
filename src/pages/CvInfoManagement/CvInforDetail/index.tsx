import React, { useEffect, useState } from 'react';
import {
    Award,
    DetailCvInfor,
    Education,
    Experience,
    initDetailCvInfor,
} from '../cvInforType';
import { TextField } from '@mui/material';
import AwardTable from './AwardTable';
import EducationTable from './EducationTable';
import ExperienceTable from './ExperienceTable';
import CvPdfViewer from './CvPdfView';
import {
    fetchDetailCvInfor,
    fetchUpdateCvInfo,
} from '../../../services/cvInforService';
import { useParams } from 'react-router-dom';
import useCvInfor from './useCvInfor';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AwardDetailModal from './DetailModal/AwardDetailModal';

export default function CvInforDetail() {
    const { cvInforId } = useParams<{ cvInforId: string }>();
    const [updateCheck, setUpdateCheck] = useState<boolean>(false);
    const [isOpenAward, setIsOpenAward] = useState<boolean>(false);
    const { cvInfor: cvInfo, setCvInfor } = useCvInfor();
    // const [awards, setAwards] = useState<Award[]>([]);
    // const [education, setEducation] = useState<Education[]>([]);
    // const [experiences, setExperiences] = useState<Experience[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const temp = await fetchDetailCvInfor(cvInforId || '');

            setCvInfor(temp.data);
            // setAwards(temp.data.awards);
            // setEducation(temp.data.educations);
            // setExperiences(temp.data.experiences);
        };
        loadData();
    }, []);

    const handleChange = (key: string, value: any) => {
        setCvInfor((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        console.log(cvInfo);
        fetchUpdateCvInfo(cvInfo).then((data) => {
            console.log(data);
            toast.success(data.data.message);
        });
        // setUpdateCheck(!updateCheck);
    };

    return (
        <div
            className="flex max-h-[calc(100vh-70px)] w-full items-start justify-center gap-5 bg-white
                pb-4"
        >
            <div className="min-w-[450px]">
                {cvInfo?.cvId && (
                    <div className="w-full">
                        <CvPdfViewer cvId={cvInfo?.cvId} />
                    </div>
                )}
            </div>
            <div className="h-full w-full overflow-y-auto px-3 pl-5 pr-6 pt-4">
                <div className="flex w-full items-start gap-7">
                    <div className="flex w-1/2 flex-col gap-4">
                        <TextField
                            id="cv-name"
                            label="Tên CV"
                            variant="outlined"
                            size="small"
                            value={cvInfo?.cvName || ''}
                            onChange={(e) =>
                                handleChange('cvName', e.target.value)
                            }
                        />
                        <TextField
                            id="fullname"
                            label="Tên ứng viên"
                            variant="outlined"
                            size="small"
                            value={cvInfo?.fullName}
                            onChange={(e) =>
                                handleChange('fullName', e.target.value)
                            }
                        />
                        <TextField
                            id="phone"
                            label="Số điện thoại"
                            variant="outlined"
                            size="small"
                            value={cvInfo?.phone}
                            onChange={(e) =>
                                handleChange('phone', e.target.value)
                            }
                        />
                    </div>
                    <div className="flex w-1/2 flex-col gap-4">
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            size="small"
                            value={cvInfo?.email}
                            onChange={(e) =>
                                handleChange('email', e.target.value)
                            }
                        />
                        <TextField
                            id="dob"
                            label="Ngày sinh"
                            variant="outlined"
                            size="small"
                            value={cvInfo?.dob}
                            onChange={(e) =>
                                handleChange('dob', e.target.value)
                            }
                        />

                        <TextField
                            id="application-position"
                            label="Vị trí ứng tuyển"
                            variant="outlined"
                            size="small"
                            value={cvInfo?.applicationPosition}
                            onChange={(e) =>
                                handleChange(
                                    'applicationPosition',
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>
                <div className="w-full py-4">
                    <TextField
                        className="w-full"
                        id="address"
                        label="Địa chỉ"
                        variant="outlined"
                        size="small"
                        value={cvInfo?.address}
                        onChange={(e) =>
                            handleChange('address', e.target.value)
                        }
                    />
                </div>
                <div className="flex items-center gap-4">
                    <h2 className="py-2 text-xl font-semibold">Giải thưởng</h2>
                    <button onClick={() => setIsOpenAward(true)}>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </button>
                    {isOpenAward && (
                        <AwardDetailModal
                            open={isOpenAward}
                            setOpen={setIsOpenAward}
                            cvInfoId={cvInforId ?? null}
                        />
                    )}
                </div>

                <AwardTable data={cvInfo?.awards} />
                <h2 className="py-2 text-xl font-semibold">Học vấn</h2>
                <EducationTable data={cvInfo?.educations} />
                <h2 className="py-2 text-xl font-semibold">Kinh nghiệm</h2>
                <ExperienceTable data={cvInfo?.experiences} />
                <div className="mt-5 flex w-full justify-end gap-5">
                    <button className="rounded-md bg-slate-300 px-5 py-1 text-lg font-semibold text-black">
                        Huỷ
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="rounded-md bg-success px-5 py-1 text-lg font-semibold text-white"
                    >
                        Chỉnh sửa
                    </button>
                </div>
            </div>
        </div>
    );
}

// const cvInfo: DetailCvInfor = {
//     cvId: 'cv123',
//     cvInforId: 'cvi456',
//     cvName: 'CV Frontend Developer',
//     fullName: 'Nguyen Van A',
//     phone: '0987654321',
//     email: 'nguyenvana@example.com',
//     dob: '1995-04-12',
//     address: '123 Đường ABC, Quận 1, TP.HCM',
//     applicationPosition: 'Frontend Developer',
//     softSkills: ['Giao tiếp', 'Làm việc nhóm', 'Giải quyết vấn đề'],
//     techSkills: ['ReactJS', 'JavaScript', 'HTML', 'CSS'],
//     awards: [
//         {
//             id: 'a1',
//             name: 'Giải nhất cuộc thi lập trình',
//             timeStr: '2022-10',
//         },
//         {
//             id: 'a2',
//             name: 'Nhân viên xuất sắc quý I',
//             timeStr: '2023-03',
//         },
//         {
//             id: 'a1',
//             name: 'Giải nhất cuộc thi lập trình',
//             timeStr: '2022-10',
//         },
//         {
//             id: 'a2',
//             name: 'Nhân viên xuất sắc quý I',
//             timeStr: '2023-03',
//         },
//     ],
//     educations: [
//         {
//             id: 'e1',
//             schoolName: 'Đại học Bách Khoa',
//             industry: 'Công nghệ thông tin',
//             timeStr: '2013 - 2017',
//             detail: 'Tốt nghiệp loại giỏi, chuyên ngành phần mềm',
//         },
//         {
//             id: 'e2',
//             schoolName: 'Coursera',
//             industry: 'ReactJS',
//             timeStr: '2021',
//             detail: 'Khoá học chuyên sâu về React và Redux',
//         },
//         {
//             id: 'e1',
//             schoolName: 'Đại học Bách Khoa',
//             industry: 'Công nghệ thông tin',
//             timeStr: '2013 - 2017',
//             detail: 'Tốt nghiệp loại giỏi, chuyên ngành phần mềm',
//         },
//         {
//             id: 'e2',
//             schoolName: 'Coursera',
//             industry: 'ReactJS',
//             timeStr: '2021',
//             detail: 'Khoá học chuyên sâu về React và Redux',
//         },
//     ],
//     experiences: [
//         {
//             id: 'ex1',
//             companyName: 'Công ty ABC',
//             position: 'Frontend Intern',
//             timeStr: '2017-07 đến 2017-12',
//             detail: 'Thực tập phát triển UI bằng HTML/CSS',
//         },
//         {
//             id: 'ex2',
//             companyName: 'Công ty XYZ',
//             position: 'Frontend Developer',
//             timeStr: '2018-01 đến nay',
//             detail: 'Xây dựng SPA bằng ReactJS, Redux, Axios',
//         },
//     ],
// };
