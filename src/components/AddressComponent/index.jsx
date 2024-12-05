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

export default function AddressComponent({
    handleChange = () => {},
    provinceInit = '',
    districtInit = '',
    wardInit = '',
    detailInit = '',
}) {
    const [provinceList, setProvinceList] = useState();
    const [provinceSelected, setProvinceSelected] = useState(provinceInit);
    const [districtList, setDistrictList] = useState();
    const [districtSelected, setDistrictSelected] = useState(districtInit);
    const [wardList, setWardList] = useState();
    const [wardSelected, setWardSelected] = useState(wardInit);
    const [detail, setDetail] = useState(detailInit);

    useEffect(() => {
        fetchListProvince().then((data) => setProvinceList(data.data));
    }, []);

    useEffect(() => {
        if (provinceSelected) {
            fetchListDistrictByProvince(provinceSelected).then((data) =>
                setDistrictList(data.data),
            );
        }
    }, [provinceSelected]);

    useEffect(() => {
        if (districtSelected) {
            fetchListWardByDistrict(districtSelected).then((data) =>
                setWardList(data.data),
            );
        }
    }, [districtSelected]);

    useEffect(() => {
        handleChange(detail, wardSelected);
    }, [detail, wardSelected]);

    return (
        <div className="flex items-center justify-center gap-3">
            <FormControl fullWidth>
                <InputLabel id="province-list-label">Tỉnh/Thành phố</InputLabel>
                <Select
                    labelId="province-list-label"
                    label="Tỉnh/Thành phố"
                    value={provinceSelected}
                    onChange={(e) => {
                        setProvinceSelected(e.target.value);
                        setDistrictSelected('');
                        setWardSelected('');
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
            <FormControl fullWidth>
                <InputLabel id="district-list-label">Quận/Huyện</InputLabel>
                <Select
                    labelId="district-list-label"
                    label="Quận/Huyện"
                    value={districtSelected}
                    onChange={(e) => {
                        setDistrictSelected(e.target.value);
                        setWardSelected('');
                    }}
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
            <FormControl fullWidth>
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
