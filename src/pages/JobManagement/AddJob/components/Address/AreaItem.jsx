import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AddressItem from './AddressItem';
import {
    faLocationDot,
    faPlus,
    faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import useAddress from '../../../../../hooks/useAddress';
import { fetchListProvince } from '../../../../../services/addressService';

export default function AreaItem({ province }) {
    const { addressTemp, addDistrict, updProvince, removeProvince } =
        useAddress();

    const [provinceSelected, setProvinceSelected] = useState('');

    const [provinceList, setProvinceList] = useState([]);
    useEffect(() => {
        fetchListProvince().then((data) => setProvinceList(data.data));
    }, []);

    const handleChangeProvince = (e) => {
        updProvince({
            ...province,
            province: e.target.value,
        });
        setProvinceSelected(e.target.value);
    };

    return (
        <div className="flex h-fit w-full flex-col gap-4 bg-slate-100 p-3">
            <div className="flex items-start">
                <div className="flex-center gap-3">
                    <div className="mb-3 flex items-center gap-3">
                        <FontAwesomeIcon icon={faLocationDot} />
                        <h4 className="text-nowrap">
                            Khu vực {addressTemp.indexOf(province) + 1}:
                        </h4>
                    </div>
                    <FormControl sx={{ width: '400px' }}>
                        <InputLabel id="province-list-label">
                            Tỉnh/Thành phố
                        </InputLabel>
                        <Select
                            labelId="province-list-label"
                            label="Tỉnh/Thành phố"
                            value={provinceSelected}
                            onChange={handleChangeProvince}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 500,
                                    },
                                },
                            }}
                        >
                            {provinceList.map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <button
                        type="button"
                        onClick={() => removeProvince(province.id)}
                    >
                        <FontAwesomeIcon
                            className="text-red-400 p-3 text-xl"
                            icon={faTrashAlt}
                        />
                    </button>
                </div>
            </div>
            <div className="items-center">
                {province.items.map((item) => {
                    return (
                        <AddressItem
                            key={item.id}
                            district={item}
                            provinceId={province.id}
                            provinceCode={province.province}
                        />
                    );
                })}
                <button
                    type="button"
                    onClick={() => addDistrict(province.id)}
                    className="ml-3 mt-3 flex items-center gap-2 text-lg font-semibold text-primary"
                >
                    <FontAwesomeIcon icon={faPlus} />
                    Thêm địa chỉ
                </button>
            </div>
        </div>
    );
}
