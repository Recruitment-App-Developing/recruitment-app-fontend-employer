import { Fragment, useContext, useEffect, useState } from 'react';
import {
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faClose,
    faTrash,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import useAddress from '../../../../../hooks/useAddress';
import {
    fetchListDistrictByProvince,
    fetchListWardByDistrict,
} from '../../../../../services/addressService';

export default function AddressItem({ provinceId, provinceCode, district }) {
    const { updDistrict, removeDistrict } = useAddress();

    const [districtList, setDistrictList] = useState([]);

    useEffect(() => {
        if (provinceCode) {
            fetchListDistrictByProvince(provinceCode).then((data) =>
                setDistrictList(data.data),
            );
            // const fetchDistrict = async () => {
            //     const res = await axios.get(
            //         `https://open.oapi.vn/location/districts?provinceId=${provinceCode}`,
            //     );
            //     const data = await res.data;
            //     setDistrictList(data.data);
            // };
            // fetchDistrict();
        }
    }, [provinceCode]);

    const [wardList, setWardList] = useState([]);
    useEffect(() => {
        if (district.district) {
            fetchListWardByDistrict(district.district).then((data) =>
                setWardList(data.data),
            );
            // const fetchWard = async () => {
            //     const res = await axios.get(
            //         `https://open.oapi.vn/location/wards?districtId=${district.district}`,
            //     );
            //     const data = await res.data;
            //     setWardList(data.data);
            // };
            // fetchWard();
        }
    }, [district.district]);

    const handleChangeDistrict = (e) => {
        updDistrict(provinceId, {
            ...district,
            district: e.target.value,
            ward: '',
            detail: '',
        });
    };

    const handleChangeWard = (e) => {
        updDistrict(provinceId, {
            ...district,
            ward: e.target.value,
            detail: '',
        });
    };

    const handleChangeDetail = (e) => {
        updDistrict(provinceId, {
            ...district,
            detail: e.target.value,
        });
    };

    return (
        <div className="flex items-center justify-center gap-3">
            <FormControl fullWidth>
                <InputLabel id="district-list-label">Quận/Huyện</InputLabel>
                <Select
                    labelId="district-list-label"
                    label="Quận/Huyện"
                    value={district.district}
                    disabled={!provinceCode}
                    onChange={handleChangeDistrict}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 500,
                            },
                        },
                    }}
                >
                    {districtList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="ward-list-label">Xã/Phường</InputLabel>
                <Select
                    labelId="ward-list-label"
                    label="Xã/Phường"
                    value={district.ward}
                    disabled={!district.district}
                    onChange={handleChangeWard}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 500,
                            },
                        },
                    }}
                >
                    {wardList.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                value={district.detail}
                onChange={handleChangeDetail}
                disabled={!district.ward}
                label="Địa chỉ chi tiết"
                variant="outlined"
            />
            <button onClick={() => removeDistrict(provinceId, district.id)}>
                <FontAwesomeIcon
                    className="text-red-400 p-3 text-xl"
                    icon={faTrashAlt}
                />
            </button>
        </div>
    );
}
