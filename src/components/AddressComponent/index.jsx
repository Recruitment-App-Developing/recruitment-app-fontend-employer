import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
    fetchListDistrictByProvince,
    fetchListProvince,
    fetchListWardByDistrict,
} from '../../services/addressService';
import { data } from 'autoprefixer';

export default function AddressComponent({ handleChange }) {
    const [provinceList, setProvinceList] = useState();
    const [provinceSelected, setProvinceSelected] = useState();
    const [districtList, setDistrictList] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [wardList, setWardList] = useState();
    const [wardSelected, setWardSelected] = useState('');
    const [detail, setDetail] = useState('');

    useEffect(() => {
        fetchListProvince().then((data) => setProvinceList(data.data));
        // const fetchProvince = async () => {
        //     const res = await axios.get(
        //         `https://open.oapi.vn/location/provinces`,
        //     );
        //     const data = await res.data;
        //     setProvinceList(data.data);
        // };
        // fetchProvince();
    }, []);

    useEffect(() => {
        if (provinceSelected) {
            fetchListDistrictByProvince(provinceSelected).then((data) =>
                setDistrictList(data.data),
            );
            // const fetchDistrict = async () => {
            //     const res = await axios.get(
            //         `https://open.oapi.vn/location/districts?provinceId=${provinceSelected}`,
            //     );
            //     const data = await res.data;
            //     setDistrictList(data.data);
            // };
            // fetchDistrict();
        }
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected) {
            fetchListWardByDistrict(districtSelected).then((data) =>
                setWardList(data.data),
            );
            // const fetchWard = async () => {
            //     const res = await axios.get(
            //         `https://open.oapi.vn/location/wards?districtId=${districtSelected}`,
            //     );
            //     const data = await res.data;
            //     setWardList(data.data);
            // };
            // fetchWard();
        }
    }, [districtSelected]);

    useEffect(() => {
        handleChange(detail, wardSelected);
    }, [detail, wardSelected]);

    return (
        <div className="flex items-center justify-center gap-3">
            <FormControl fullWidth sx={{ width: '400px' }}>
                <InputLabel id="province-list-label">Tỉnh/Thành phố</InputLabel>
                <Select
                    labelId="province-list-label"
                    label="Tỉnh/Thành phố"
                    value={provinceSelected}
                    onChange={(e) => {
                        setProvinceSelected(e.target.value);
                    }}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 500,
                            },
                        },
                    }}
                >
                    {provinceList?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ width: '400px' }}>
                <InputLabel id="district-list-label">Quận/Huyện</InputLabel>
                <Select
                    labelId="district-list-label"
                    label="Quận/Huyện"
                    value={districtSelected}
                    onChange={(e) => setDistrictSelected(e.target.value)}
                    disabled={!provinceSelected}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 500,
                            },
                        },
                    }}
                >
                    {districtList?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ width: '400px' }}>
                <InputLabel id="ward-list-label">Xã/Phường</InputLabel>
                <Select
                    labelId="ward-list-label"
                    label="Xã/Phường"
                    value={wardSelected}
                    onChange={(e) => {
                        setWardSelected(e.target.value);
                    }}
                    disabled={!districtSelected}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 500,
                            },
                        },
                    }}
                >
                    {wardList?.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            {item.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                value={detail}
                onChange={(e) => {
                    setDetail(e.target.value);
                }}
                disabled={!wardSelected}
                label="Địa chỉ chi tiết"
                variant="outlined"
            />
        </div>
    );
}
