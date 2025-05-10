import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DistributedChart from '../../components/Chart/DistributedChart';
import PieChart from '../../components/Chart/PieChart';
import {
    faBullhorn,
    faEnvelope,
    faFileAlt,
    faFileImport,
    faFilePowerpoint,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { Avatar } from '@mui/material';
import AreaChart from '../../components/Chart/AreaChart';
import { useEffect, useState } from 'react';
import {
    fetchStatistcGeneralJobByIndustry,
    fetchStatisticApplicationStatusByCompany,
    fetchStatisticApplyCandidateByDay,
    fetchStatisticCompanyJobByIndustry,
    fetchStatisticGeneralJobByDay,
    fetchStatisticRecruitmentEffective,
} from '../../services/statisticService';
import { USER_INFOR } from '../../constants/Constant';

export default function Dashboard() {
    const employerInfor = JSON.parse(localStorage.getItem(USER_INFOR));

    const [statistcGeneralJobByIndustry, setStatistcGeneralJobByIndustry] =
        useState();
    const [statisticGeneralJobByDay, setStatisticGeneralJobByDay] = useState();

    const [statisticCompanyJobByIndustry, setStatisticCompanyJobByIndustry] =
        useState();

    const [statisticRecruitmentEffective, setStatisticRecruitmentEffective] =
        useState();

    const [
        statisticApplicationStatusByCompany,
        setStatisticApplicationStatusByCompany,
    ] = useState();
    const [statisticApplyCandidateByDay, setStatisticApplyCandidateByDay] =
        useState();

    useEffect(() => {
        fetchStatistcGeneralJobByIndustry().then((data) =>
            setStatistcGeneralJobByIndustry(data.data),
        );
    }, []);

    useEffect(() => {
        fetchStatisticGeneralJobByDay().then((data) =>
            setStatisticGeneralJobByDay(data.data),
        );
    }, []);

    useEffect(() => {
        fetchStatisticCompanyJobByIndustry().then((data) =>
            setStatisticCompanyJobByIndustry(data.data),
        );
    }, []);

    useEffect(() => {
        fetchStatisticRecruitmentEffective().then((data) =>
            setStatisticRecruitmentEffective(data.data),
        );
    }, []);

    useEffect(() => {
        fetchStatisticApplicationStatusByCompany().then((data) =>
            setStatisticApplicationStatusByCompany(data.data),
        );
    }, []);

    useEffect(() => {
        fetchStatisticApplyCandidateByDay().then((data) =>
            setStatisticApplyCandidateByDay(data.data),
        );
    }, []);

    return (
        <div className="h-full w-full rounded-md">
            <div>
                <h2 className="mb-3 rounded-md bg-white p-2 text-lg font-semibold">
                    Thông tin chung thị trường tuyển dụng
                </h2>
                <div className="flex gap-3">
                    <div className="h-full w-1/2 rounded-md bg-white p-2">
                        <h2>Thống kê công việc theo ngành nghề</h2>
                        <DistributedChart
                            data={statistcGeneralJobByIndustry?.data}
                            categories={
                                statistcGeneralJobByIndustry?.categories
                            }
                        />
                    </div>
                    <div className="w-1/2 rounded-md bg-white p-2">
                        <h2>
                            Thống kê số lượng tin tuyển dụng một tháng gần nhất
                        </h2>
                        <AreaChart
                            data={statisticGeneralJobByDay?.data}
                            categories={statisticGeneralJobByDay?.categories}
                        />
                    </div>
                </div>
                <h2 className="my-3 rounded-md bg-white p-2 text-lg font-semibold">
                    Bảng tin của tôi
                </h2>
                <div className="mb-3 flex w-full gap-3">
                    <div className="w-1/2 rounded-md bg-white px-3">
                        <h2>Hiệu quả tuyển dụng</h2>
                        <div className="grid h-[187px] grid-cols-2 grid-rows-2 gap-x-4 gap-y-3">
                            <div className="flex justify-between rounded-lg bg-[#ebf3ff] p-4">
                                <div>
                                    <h5 className="text-lg font-normal text-[#2d7cf1]">
                                        {
                                            statisticRecruitmentEffective?.jobActive
                                        }
                                    </h5>
                                    <h5 className="text-base font-normal text-[#2d7cf1]">
                                        Tin tuyển dụng đang mở
                                    </h5>
                                </div>
                                <div className="flex h-full items-center justify-center pb-4">
                                    <FontAwesomeIcon
                                        icon={faBullhorn}
                                        className="text-lg text-[#2d7cf1]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between rounded-lg bg-[#f5fff9] p-4">
                                <div>
                                    <h5 className="text-lg font-normal text-[#00b14f]">
                                        {statisticRecruitmentEffective?.cvSum}
                                    </h5>
                                    <h5 className="text-base font-normal text-[#00b14f]">
                                        CV tiếp nhận
                                    </h5>
                                </div>
                                <div className="flex h-full items-center justify-center pb-4">
                                    <FontAwesomeIcon
                                        icon={faFilePowerpoint}
                                        className="text-lg text-[#00b14f]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between rounded-lg bg-[#fffae9] p-4">
                                <div>
                                    <h5 className="text-lg font-normal text-[#e5b500]">
                                        {
                                            statisticRecruitmentEffective?.jobInactive
                                        }
                                    </h5>
                                    <h5 className="text-base font-normal text-[#e5b500]">
                                        Tin tuyển dụng bị ẩn
                                    </h5>
                                </div>
                                <div className="flex h-full items-center justify-center pb-4">
                                    <FontAwesomeIcon
                                        icon={faFileAlt}
                                        className="text-lg text-[#e5b500]"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between rounded-lg bg-[#fff3f2] p-4">
                                <div>
                                    <h5 className="text-lg font-normal text-[#da4538]">
                                        {statisticRecruitmentEffective?.newCV}
                                    </h5>
                                    <h5 className="text-base font-normal text-[#da4538]">
                                        CV ứng tuyển mới
                                    </h5>
                                </div>
                                <div className="flex h-full items-center justify-center pb-4">
                                    <FontAwesomeIcon
                                        icon={faFileImport}
                                        className="text-lg text-[#da4538]"
                                    />
                                </div>
                            </div>
                        </div>
                        <DistributedChart
                            data={statisticCompanyJobByIndustry?.data}
                            categories={
                                statisticCompanyJobByIndustry?.categories
                            }
                        />
                    </div>
                    <div className="flex w-1/2 flex-col gap-3">
                        <div className="h-full rounded-md bg-white p-3">
                            <div
                                className="relative h-fit w-full bg-gradient-to-r from-[#f2fbff] via-[#e7eff5] to-[#e7eff5]
                                    px-4 pb-5 pt-3"
                            >
                                <div className="relative flex h-full w-fit items-center justify-center gap-3">
                                    <Avatar
                                        sx={{ height: '60px', width: '60px' }}
                                        src={employerInfor.avatar || ''}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg font-bold leading-5">
                                            {employerInfor.username}
                                        </h1>
                                        <h2 className="w-fit rounded bg-slate-300 px-2 py-1 font-normal leading-4">
                                            Mã NTD: {employerInfor.id}
                                        </h2>
                                        <div className="flex gap-4">
                                            <div className="flex w-fit items-center justify-center gap-2 text-base text-black">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                />
                                                <span>
                                                    {employerInfor.email}
                                                </span>
                                            </div>
                                            <div className="flex w-fit items-center justify-center gap-2 text-base text-black">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                />
                                                <span>
                                                    {employerInfor.phoneNumber}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="absolute left-0 top-[66px] h-6 w-full fill-white
                                        drop-shadow-[0_-4px_20px_rgba(0,0,0,0.16)] filter"
                                >
                                    <img
                                        className="w-full align-middle"
                                        src="https://tuyendung.topcv.vn/app/_nuxt/img/subtract.ba3a797.svg"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="rounded-md bg-white">
                            <PieChart
                                realData={
                                    statisticApplicationStatusByCompany?.realData
                                }
                                data={statisticApplicationStatusByCompany?.data}
                                categories={
                                    statisticApplicationStatusByCompany?.categories
                                }
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col rounded-md bg-white p-3">
                    <h2>Số lượng ứng viên ứng tuyển</h2>
                    <AreaChart
                        serieName="Ứng viên"
                        subtitle="Số lượng ứng viên"
                        data={statisticApplyCandidateByDay?.data}
                        categories={statisticApplyCandidateByDay?.categories}
                    />
                </div>
            </div>
        </div>
    );
}

const data = {
    statisticGeneralJobByIndustry: {
        data: [21, 44, 55, 54, 100, 200, 321, 124, 234],
        categories: [
            'Công nghệ thông tin',
            'Kế toán - Kiểm toán',
            'Tài chính - Ngân hàng',
            'Nhân sự',
            'Quản lý - Điều hành',
            'Marketing - PR',
            'Bán hàng - Kinh doanh',
            'Giáo dục - Đào tạo',
            'Dịch vụ khách hàng',
        ],
    },
    statisticGeneralJobByLastestWeek: {
        data: [12, 20, 21, 15, 10, 19, 27, 30, 40],
        categories: [
            '2024-10-01',
            '2024-10-02',
            '2024-10-03',
            '2024-10-04',
            '2024-10-05',
            '2024-10-06',
            '2024-10-07',
            '2024-10-08',
            '2024-10-09',
        ],
    },
    statisticCompanyJobByIndustry: {
        data: [21, 44, 55, 54, 100, 200, 321, 124, 234],
        categories: [
            'Công nghệ thông tin',
            'Kế toán - Kiểm toán',
            'Tài chính - Ngân hàng',
            'Nhân sự',
            'Quản lý - Điều hành',
            'Marketing - PR',
            'Bán hàng - Kinh doanh',
            'Giáo dục - Đào tạo',
            'Dịch vụ khách hàng',
        ],
    },
    statisticCompanyApplicationStatus: {
        data: [25.8, 25, 25, 24.2],
        categories: [
            'Mới ứng tuyển',
            'CV đã xem',
            'Hẹn phỏng vấn',
            'Cho phép liên hệ',
        ],
    },
    statisticCandidate: {
        data: [12, 20, 21, 15, 10, 19, 27, 30, 40],
        categories: [
            '01-10-2024',
            '02-10-2024',
            '03-10-2024',
            '04-10-2024',
            '05-10-2024',
            '06-10-2024',
            '07-10-2024',
            '08-10-2024',
            '09-10-2024',
        ],
    },
    effectiveApply: {
        showJob: 10,
        receptionCv: 102,
        hiddenJob: 5,
        newApplyCv: 43,
    },
};
