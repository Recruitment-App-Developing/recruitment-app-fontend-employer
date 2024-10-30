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
        <div className="ml-4 flex flex-col gap-2">
            <h3>
                <b>Mã số tin tuyển dụng:</b> {jobInfor?.id}
            </h3>
            <h3>
                <b>Tên tin tuyển dụng:</b> {jobInfor?.name}
            </h3>
            <h3>
                <b>Địa chỉ làm việc:</b>{' '}
                {jobInfor?.address.map((item) => item + ' | ')}
            </h3>
            <h3>
                <b>Vị trí tuyển dụng:</b> {jobInfor?.jobPosition}
            </h3>
            <h3>
                <b>Số lượng tuyển dụng:</b> {jobInfor?.numberOfVacancy}
            </h3>
            <h3>
                <b>Hình thức làm việc:</b> {jobInfor?.workMethod}
            </h3>
            <h3>
                <b>Giới tính yêu cầu:</b> {jobInfor?.sexRequired}
            </h3>
            <h3>
                <b>Lương:</b> {jobInfor?.salary}
            </h3>
            <h3>
                <b>Yêu cầu kinh nghiệm:</b> {jobInfor?.jobExp}
            </h3>
            <h3>
                <b>Thời gian đăng tin tuyển dụng:</b> {jobInfor?.postingTime}
            </h3>
            <h3>
                <b>Hạn ứng tuyển:</b> {jobInfor?.applicationDueTime}
            </h3>
            <h3>
                Số l<b>ượng ứng viên đã ứng tuyển:</b>{' '}
                {jobInfor?.numberOfApplicated}
            </h3>
            <h3>
                Ngành nghề chính:{' '}
                {
                    industryData.filter(
                        (item) => item.id == jobInfor?.mainIndustry,
                    ).name
                }
            </h3>
            <h3>
                <b>Số lượt yêu thích công việc:</b> {jobInfor?.numberOfLike}
            </h3>
            <h3>
                <b>Số lượt xem:</b> {jobInfor?.numberOfView}
            </h3>
            <h3>
                <b>Hình thức ứng tuyển:</b> {jobInfor?.applicationMethod}
            </h3>
            <h3>
                <b>Quyền lợi ứng viên:</b>{' '}
                <p
                    dangerouslySetInnerHTML={{ __html: jobInfor?.jobBenefit }}
                ></p>
            </h3>
            <h3>
                <b>Mô tả chi tiết công việc:</b>{' '}
                <p
                    dangerouslySetInnerHTML={{ __html: jobInfor?.jobDescript }}
                ></p>
            </h3>
            <h3>
                <b>Yêu cầu với ứng viên:</b>{' '}
                <p
                    dangerouslySetInnerHTML={{
                        __html: jobInfor?.jobRequirement,
                    }}
                ></p>
            </h3>
            <h3>
                <b>Thông tin thêm:</b>{' '}
                <p
                    dangerouslySetInnerHTML={{
                        __html: jobInfor?.addApplicationInfor,
                    }}
                ></p>
            </h3>
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
