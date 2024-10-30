import { Avatar } from '@mui/material';

export default function MyCompany({ comapny }) {
    const handleActiveFields = () => {
        let temp;
        comapny.activeFields.forEach((item) => {
            temp += item + ', ';
        });
        return temp;
    };

    return (
        <div className="p-2">
            <h2>Thông tin công ty</h2>
            <div className="flex items-center gap-4 border border-solid border-slate-300 p-3">
                <Avatar src={comapny?.logo.imageUrl} />
                <div className="flex flex-col">
                    <b>{comapny?.name}</b>
                    <span>{comapny?.headQuaters}</span>
                </div>
            </div>
            <table className="w-full" cellPadding={5}>
                <tr>
                    <td>Mã số thuế:</td>
                    <td>{comapny?.taxCode}</td>
                    <td>Website:</td>
                    <td>{comapny?.urlCom}</td>
                </tr>
                <tr>
                    <td>Số điện thoại:</td>
                    <td>{comapny?.phoneNumber}</td>
                    <td>Quy mô:</td>
                    <td>{comapny?.employeeScale}</td>
                </tr>
                <tr>
                    <td>Lĩnh vực hoạt động:</td>
                    <td colSpan={3}>{handleActiveFields}</td>
                </tr>
                <tr>
                    <td>Địa chỉ trụ sở chính:</td>
                    <td colSpan={3}>{comapny?.headQuaters}</td>
                </tr>
                <tr>
                    <td>Mô tả công ty:</td>
                    <td colSpan={3}>
                        <p
                            dangerouslySetInnerHTML={{
                                __html: comapny?.detailIntro,
                            }}
                        ></p>
                    </td>
                </tr>
            </table>
        </div>
    );
}

const dataL = {
    id: 15,
    name: 'Công ty Sữa TH True Milk',
    logo: {
        id: 87,
        imageUrl:
            'https://res.cloudinary.com/dtcokd0bb/image/upload/v1730083629/TopCV/Image/CompanyLogo/jktqdnpuohhxhuahplq7.jpg',
    },
    phoneNumber: '213908532',
    taxCode: '2343252345',
    urlCom: 'https://th.com',
    employeeScale: '500-1000 nhân viên',
    numberOfFollow: null,
    headQuaters: 'Số 329, Thị trấn Đồi Ngô, Lục Nam, Bắc Giang',
    activeFields: ['IT-Phần mềm, Sản xuất, Xuất nhập khẩu'],
    subAddress: [
        'Số 329, Thị trấn Đồi Ngô, Lục Nam, Bắc Giang',
        'Số 329, Thị trấn Đồi Ngô, Lục Nam, Bắc Giang',
        'Số 329, Thị trấn Đồi Ngô, Lục Nam, Bắc Giang',
        'Số 329, Thị trấn Đồi Ngô, Lục Nam, Bắc Giang',
    ],
    detailIntro: '<p>Th true milk là công ty sữa</p>',
};
