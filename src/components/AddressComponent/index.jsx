import {
    Autocomplete,
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
            <Autocomplete
                disablePortal
                options={provinceList || []}
                getOptionLabel={(option) => option.name || ''}
                value={
                    provinceList
                        ? provinceList.find(
                              (item) => item.id === provinceSelected,
                          ) || null
                        : null
                }
                onChange={(event, newValue) => {
                    setProvinceSelected(newValue?.id || '');
                    setDistrictSelected('');
                    setWardSelected('');
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField {...params} label="Tỉnh/Thành phố" />
                )}
            />
            <Autocomplete
                disablePortal
                options={districtList || []}
                getOptionLabel={(option) => option.name || ''}
                value={
                    districtList
                        ? districtList.find(
                              (item) => item.id === districtSelected,
                          ) || null
                        : null
                }
                onChange={(event, newValue) => {
                    setDistrictSelected(newValue?.id || '');
                    setWardSelected('');
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField {...params} label="Quận/Huyện" />
                )}
            />
            <Autocomplete
                disablePortal
                options={wardList || []}
                getOptionLabel={(option) => option.name || ''}
                value={
                    wardList
                        ? wardList.find((item) => item.id === wardSelected) ||
                          null
                        : null
                }
                onChange={(event, newValue) => {
                    setWardSelected(newValue?.id || '');
                }}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                    <TextField {...params} label="Xã/Phường" />
                )}
            />
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
