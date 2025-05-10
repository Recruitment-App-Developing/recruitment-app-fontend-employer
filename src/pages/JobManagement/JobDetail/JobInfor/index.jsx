import { useParams } from 'react-router-dom';
import { industryData } from '../../../../constants/IndustryData';
import { useEffect, useState } from 'react';
import { fetchDetailJobById } from '../../../../services/jobService';

export default function JobInfor() {
    const { jobId } = useParams();

    const [jobInfor, setJobInfor] = useState();
    useEffect(() => {
        fetchDetailJobById(jobId).then((data) => setJobInfor(data.data));
    }, []);

    return (
        <div className="ml-4 flex flex-col gap-8">
            {/* Nhóm 1: Thông tin chung */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                    <div className="text-gray-700">
                        {/* Mã số tin tuyển dụng */}
                        <table className="bg-gray-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Mã số tin tuyển dụng:
                                    </td>
                                    <td className="px-4">{jobInfor?.id}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Tên tin tuyển dụng */}
                        <table className="bg-blue-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Tên tin tuyển dụng:
                                    </td>
                                    <td className="px-4">{jobInfor?.name}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Địa chỉ làm việc */}
                        <table className="bg-green-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Địa chỉ làm việc:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.address.join(' | ')}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Vị trí tuyển dụng */}
                        <table className="bg-yellow-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Vị trí tuyển dụng:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.jobPosition}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Group 2 */}
                <div className="rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                    <div className="text-gray-700">
                        {/* Số lượng tuyển dụng */}
                        <table className="bg-gray-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Số lượng tuyển dụng:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.numberOfVacancy}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Hình thức làm việc */}
                        <table className="bg-blue-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Hình thức làm việc:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.workMethod}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Giới tính yêu cầu */}
                        <table className="bg-green-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Giới tính yêu cầu:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.sexRequired}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Lương */}
                        <table className="bg-yellow-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Lương:
                                    </td>
                                    <td className="px-4">{jobInfor?.salary}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Group 3 */}
                <div className="rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                    <div className="text-gray-700">
                        {/* Yêu cầu kinh nghiệm */}
                        <table className="bg-gray-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Yêu cầu kinh nghiệm:
                                    </td>
                                    <td className="px-4">{jobInfor?.jobExp}</td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Thời gian đăng tin */}
                        <table className="bg-blue-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Thời gian đăng tin:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.postingTime}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Hạn ứng tuyển */}
                        <table className="bg-green-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Hạn ứng tuyển:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.applicationDueTime}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Số lượng ứng viên đã ứng tuyển */}
                        <table className="bg-yellow-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Số lượng ứng viên đã ứng tuyển:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.numberOfApplicated}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Group 4 */}
                <div className="rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:shadow-lg">
                    <div className="text-gray-700">
                        {/* Ngành nghề chính */}
                        <table className="bg-gray-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Ngành nghề chính:
                                    </td>
                                    <td className="px-4">
                                        {
                                            industryData.find(
                                                (item) =>
                                                    item.id ==
                                                    jobInfor?.mainIndustry,
                                            )?.name
                                        }
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Số lượt yêu thích */}
                        <table className="bg-blue-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Số lượt yêu thích:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.numberOfLike}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Số lượt xem */}
                        <table className="bg-green-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Số lượt xem:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.numberOfView}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Hình thức ứng tuyển */}
                        <table className="bg-yellow-50 mb-4 min-w-full table-auto rounded-md">
                            <tbody>
                                <tr>
                                    <td className="w-44 px-4 font-semibold">
                                        Hình thức ứng tuyển:
                                    </td>
                                    <td className="px-4">
                                        {jobInfor?.applicationMethod}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Nhóm 2: Thông tin chi tiết */}
            <div className="flex flex-col gap-4">
                <h2 className="text-gray-800 text-2xl font-semibold">
                    Thông tin chi tiết
                </h2>

                {/* Các phần hiển thị theo chiều ngang */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    {/* Quyền lợi ứng viên */}
                    <div
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow-lg transition-all
                            duration-300"
                    >
                        <h3 className="text-lg font-semibold">
                            Quyền lợi ứng viên
                        </h3>
                        <div
                            className="text-gray-700 mt-2"
                            dangerouslySetInnerHTML={{
                                __html: jobInfor?.jobBenefit,
                            }}
                        />
                    </div>

                    {/* Mô tả chi tiết công việc */}
                    <div
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow-lg transition-all
                            duration-300"
                    >
                        <h3 className="text-lg font-semibold">
                            Mô tả chi tiết công việc
                        </h3>
                        <div
                            className="text-gray-700 mt-2"
                            dangerouslySetInnerHTML={{
                                __html: jobInfor?.jobDescript,
                            }}
                        />
                    </div>

                    {/* Yêu cầu với ứng viên */}
                    <div
                        className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 shadow-lg transition-all
                            duration-300"
                    >
                        <h3 className="text-lg font-semibold">
                            Yêu cầu với ứng viên
                        </h3>
                        <div
                            className="text-gray-700 mt-2"
                            dangerouslySetInnerHTML={{
                                __html: jobInfor?.jobRequirement,
                            }}
                        />
                    </div>
                </div>

                {/* Thông tin thêm */}
                <div className="bg-gray-100 mt-6 rounded-lg p-4 shadow-lg">
                    <h3 className="text-lg font-semibold">Thông tin thêm</h3>
                    <div
                        className="text-gray-700 mt-2"
                        dangerouslySetInnerHTML={{
                            __html: jobInfor?.addApplicationInfor,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
// address, isVerified, subIndustry, image
const jobInfor = {
    id: 21,
    name: 'Nhân Viên Tư Vấn Tuyển Sinh Chỉ Tuyển Nữ, Kinh Nghiệm Telesales Từ 6 Tháng Trở Lên',
    company: null,
    address: [
        'Hà Nội: Số 34, Tàm Xá, Đông Anh',
        'Bà Rịa - Vũng Tàu: Số 32, Nghĩa Thành, Châu Đức',
    ],
    jobPosition: 'NHAN_VIEN',
    numberOfVacancy: 30,
    workMethod: 'FULLTIME',
    sexRequired: 'MALE',
    salary: '10 triệu đồng',
    jobExp: '3 năm',
    postingTime: '12:59 19-09-2024',
    applicationDueTime: '10:22 10-10-2024',
    numberOfApplicated: 5,
    isVerified: false,
    jobBenefit: 'Job Benefit',
    jobDescript: 'Job Descritpion',
    jobRequirement: 'Job Requirement',
    addApplicationInfor: 'Send CV via email',
    lastUpdated: null,
    numberOfLike: 0,
    numberOfView: 10,
    applicationMethod: 'ONLINE',
    isApply: true,
    imageList: [
        {
            id: 62,
            imageUrl:
                'http://res.cloudinary.com/dtcokd0bb/image/upload/v1726725587/TopCV/Image/Job/hqxnchrh0zfusdo0tq27.jpg',
        },
        {
            id: 63,
            imageUrl:
                'http://res.cloudinary.com/dtcokd0bb/image/upload/v1726725588/TopCV/Image/Job/itbqjiwxciy0s7j3tzhf.jpg',
        },
    ],
    mainIndustry: 3,
    subIndustries: [8],
};
