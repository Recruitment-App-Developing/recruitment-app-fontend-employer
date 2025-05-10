import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import {
    fetchMyAccount,
    fetchUpdateAccount,
} from '../../../services/employerService';
import Loading from '../../../components/Loading';
import { data } from 'autoprefixer';
import AddressComponent from '../../../components/AddressComponent';
import { toast } from 'react-toastify';
import ImageItem from '../../../components/ImageItem';
import { USER_INFOR } from '../../../constants/Constant';
import { useNavigate } from 'react-router-dom';

export default function MyInfor() {
    const navigate = useNavigate();

    const [myInfor, setMyInfor] = useState();
    const [editInfor, setEditInfor] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        avatar: '',
    });

    useEffect(() => {
        fetchMyAccount().then((data) => {
            setMyInfor(data.data);
            setEditInfor({
                ...editInfor,
                firstName: data.data.firstName,
                lastName: data.data.lastName,
                gender: data.data.gender,
                dateOfBirth: data.data.dateOfBirth,
                avatar: data.data.avatar.imageUrl,
            });
        });
    }, []);

    if (!myInfor) return <Loading />;

    const handleAddress = (detail, wardCode) => {
        setEditInfor({ ...editInfor, address: detail + ';' + wardCode });
    };

    const handleChange = (key, value) => {
        setEditInfor((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async () => {
        const data = await fetchUpdateAccount(editInfor);
        if (!data.success) {
            toast.error(data.message);
            return;
        }
        setMyInfor(data.data);
        setEditInfor({
            ...editInfor,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            gender: data.data.gender,
            dateOfBirth: data.data.dateOfBirth,
            avatar: data.data.avatar.imageUrl,
        });
        toast.success(data.message);
        const userInfor = {
            id: data.data.id,
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            avatar: data.data.avatar.imageUrl,
            username: data.data.username,
            email: data.data.email,
            phone: data.data.phoneNumber,
        };

        localStorage.setItem(USER_INFOR, JSON.stringify(userInfor));
        navigate(0);
    };

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold text-success">
                Cài đặt thông tin cá nhân
            </h1>
            <div className="mb-8 mt-4 flex justify-between">
                <div className="flex flex-col gap-3">
                    <div>
                        <b className="text-xl">Mã tài khoản: </b>
                        <span className="text-xl font-semibold text-success">
                            {myInfor?.id}
                        </span>
                    </div>
                    <div>
                        <b className="text-xl">Cấp độ xác thực: </b>
                        <span className="text-xl font-semibold text-success">
                            {myInfor?.verifiedLevel} / 3
                        </span>
                    </div>
                    <div>
                        <b className="text-xl">Tên đăng nhập: </b>
                        <span className="text-xl font-semibold text-success">
                            {myInfor?.username}
                        </span>
                    </div>
                    <div>
                        <b className="text-xl">Số điện thoại: </b>
                        <span className="text-xl font-semibold text-success">
                            {myInfor?.phoneNumber}
                        </span>
                    </div>
                    <div>
                        <b className="text-xl">Email: </b>
                        <span className="text-xl font-semibold text-success">
                            {myInfor?.email}
                        </span>
                    </div>
                </div>
                <div className="mr-16 flex items-center justify-center">
                    <ImageItem
                        src={editInfor.avatar}
                        onChange={(res) =>
                            setEditInfor({ ...editInfor, avatar: res })
                        }
                        height="h-36"
                        width="w-36"
                    />
                </div>
            </div>
            <h2 className="mb-3 ml-4 text-xl font-medium">
                Thông tin chỉnh sửa
            </h2>
            <div className="mt-4 flex gap-4">
                <TextField
                    fullWidth
                    label="First Name"
                    type="text"
                    value={editInfor?.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Last Name"
                    type="text"
                    value={editInfor?.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                />
            </div>
            <div className="mt-4 flex gap-20">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Ngày sinh"
                        value={
                            editInfor?.dateOfBirth
                                ? dayjs(editInfor?.dateOfBirth, 'DD-MM-YYYY')
                                : null
                        }
                        onChange={(newValue) =>
                            handleChange(
                                'dateOfBirth',
                                newValue.format('DD-MM-YYYY'),
                            )
                        }
                        renderInput={(params) => <TextField {...params} />}
                        format="DD-MM-YYYY"
                    />
                </LocalizationProvider>
                <FormControl>
                    <FormLabel>Giới tính</FormLabel>
                    <RadioGroup
                        value={editInfor?.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                    >
                        <div className="flex">
                            <FormControlLabel
                                value="MALE"
                                control={<Radio />}
                                label="Nam"
                            />
                            <FormControlLabel
                                value="FEMALE"
                                control={<Radio />}
                                label="Nữ"
                            />
                        </div>
                    </RadioGroup>
                </FormControl>
            </div>
            <div>
                <label>Địa chỉ</label>
                <div className="mt-4">
                    {myInfor?.address ? (
                        <AddressComponent
                            handleChange={handleAddress}
                            provinceInit={myInfor?.address.provinceCode}
                            districtInit={myInfor?.address.districtCode}
                            wardInit={myInfor?.address.wardCode}
                            detailInit={myInfor?.address.detail}
                        />
                    ) : (
                        <AddressComponent handleChange={handleAddress} />
                    )}
                </div>
            </div>
            {myInfor?.lastUpdated && (
                <div className="mt-3">
                    <b className="text-xl">Cập nhật lần cuối: </b>
                    <span className="text-xl font-semibold text-success">
                        {myInfor?.lastUpdated}
                    </span>
                </div>
            )}
            <div className="text-gray-700 mt-3 font-semibold">
                Ngày khởi tạo:{' '}
                <span className="text-xl font-semibold text-success">
                    {myInfor?.whenCreated}
                </span>
            </div>
            <div className="mt-3 flex justify-end">
                <button
                    onClick={handleSubmit}
                    className="rounded-md bg-primary px-3 py-2 font-medium text-white"
                >
                    Cập nhật tài khoản
                </button>
            </div>
        </div>
    );
}
