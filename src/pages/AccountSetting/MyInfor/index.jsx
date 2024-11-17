import {
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { genderData } from '../../../constants/GenderData';
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

export default function MyInfor() {
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

    const handleSubmit = () => {
        fetchUpdateAccount(editInfor).then((data) => {
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
        });
    };

    console.log(editInfor);

    return (
        <div className="w-full">
            <ImageItem
                src={editInfor.avatar}
                onChange={(res) => setEditInfor({ ...editInfor, avatar: res })}
            />
            <div>
                <b>Mã tài khoản:</b>
                <span>{myInfor?.id}</span>
            </div>
            <div>
                <b>Cấp độ xác thực:</b>
                <span>{myInfor?.verifiedLevel} / 3</span>
            </div>
            <div>
                <b>Tên đăng nhập:</b>
                <span>{myInfor?.username}</span>
            </div>
            <TextField
                label="First Name"
                type="text"
                value={editInfor?.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
            />
            <TextField
                label="Last Name"
                type="text"
                value={editInfor?.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
            />
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
            <div>
                <b>Số điện thoại:</b>
                <span>{myInfor?.phoneNumber}</span>
            </div>
            <div>
                <b>Email:</b>
                <span>{myInfor?.email}</span>
            </div>
            <div>
                <span>Địa chỉ</span>
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
            {myInfor?.lastUpdated && (
                <div>
                    <b>Cập nhật lần cuối:</b>
                    <span>{myInfor?.lastUpdated}</span>
                </div>
            )}
            <div className="text-gray-700 font-semibold">
                Ngày khởi tạo:{' '}
                <span className="text-primary">{myInfor?.whenCreated}</span>
            </div>
            <div className="flex justify-end">
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
