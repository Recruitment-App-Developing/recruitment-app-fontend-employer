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
} from '../../services/statisticService';

export default function Dashboard() {
    const [statistcGeneralJobByIndustry, setStatistcGeneralJobByIndustry] =
        useState();
    const [statisticGeneralJobByDay, setStatisticGeneralJobByDay] = useState();

    const [statisticCompanyJobByIndustry, setStatisticCompanyJobByIndustry] =
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
                                        {data.effectiveApply.showJob}
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
                                        {data.effectiveApply.receptionCv}
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
                                        {data.effectiveApply.hiddenJob}
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
                                        {data.effectiveApply.newApplyCv}
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
                                        src={data.employerInfor.avatar}
                                    />
                                    <div className="flex flex-col gap-1">
                                        <h1 className="text-lg font-bold leading-5">
                                            {data.employerInfor.username}
                                        </h1>
                                        <h2 className="w-fit rounded bg-slate-300 px-2 py-1 font-normal leading-4">
                                            Mã NTD: {data.employerInfor.id}
                                        </h2>
                                        <div className="flex gap-4">
                                            <div className="flex w-fit items-center justify-center gap-2 text-base text-black">
                                                <FontAwesomeIcon
                                                    icon={faEnvelope}
                                                />
                                                <span>
                                                    {data.employerInfor.email}
                                                </span>
                                            </div>
                                            <div className="flex w-fit items-center justify-center gap-2 text-base text-black">
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                />
                                                <span>
                                                    {
                                                        data.employerInfor
                                                            .phoneNumber
                                                    }
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
    employerInfor: {
        id: 235235,
        username: 'phamducthong',
        email: 'thongpd@gmail.com',
        phoneNumber: '12384942',
        avatar: 'data:image/jpeg;base64,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',
    },
};
