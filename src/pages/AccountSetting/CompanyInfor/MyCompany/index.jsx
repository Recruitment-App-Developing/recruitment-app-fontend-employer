import { Avatar } from '@mui/material';

export default function MyCompany({ comapny }) {
    // const handleActiveFields = () => {
    //     let temp;
    //     comapny?.activeFields.forEach((item) => {
    //         temp += item + ', ';
    //     });
    //     return temp;
    // };

    return (
        <div className="p-2">
            <h2>Thông tin công ty</h2>
            <div className="flex items-center gap-4 border border-solid border-slate-300 p-3">
                <Avatar
                    sx={{ width: '80px', height: '80px' }}
                    src={comapny?.logo}
                />
                <div className="ml-8 flex flex-col gap-3">
                    <b className="text-2xl">{comapny?.name}</b>
                    <span>{comapny?.headQuaters}</span>
                </div>
            </div>
            <table className="mt-4 w-full" cellPadding={5}>
                <tr>
                    <td className="text-nowrap">Mã số thuế:</td>
                    <td>{comapny?.taxCode}</td>
                    <td className="text-nowrap">Website:</td>
                    <td>{comapny?.urlCom}</td>
                </tr>
                <tr>
                    <td className="text-nowrap">Số điện thoại:</td>
                    <td>{comapny?.phoneNumber}</td>
                    <td className="text-nowrap">Quy mô:</td>
                    <td>{comapny?.employeeScale}</td>
                </tr>
                <tr>
                    <td className="text-nowrap">Lĩnh vực hoạt động:</td>
                    <td colSpan={3}>{comapny?.activeFields.join(', ')}</td>
                </tr>
                <tr>
                    <td className="text-nowrap">Địa chỉ trụ sở chính:</td>
                    <td colSpan={3}>{comapny?.headQuaters}</td>
                </tr>
                <tr>
                    <td className="text-nowrap">Mô tả công ty:</td>
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
