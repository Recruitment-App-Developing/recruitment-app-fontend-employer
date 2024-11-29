import {
    Button,
    Dialog,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { fetchUpdJobAddress } from '../../../../services/jobService';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
    fetchListDistrictByProvince,
    fetchListProvince,
    fetchListWardByDistrict,
} from '../../../../services/addressService';

export default function AddressEditModal({
    jobId,
    jobAddressId,
    provinceName,
    districtName,
    wardName,
    oldDetail,
    setAddressList,
}) {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState({
        jobAddressId: jobAddressId,
        wardCode: '',
        detail: '',
    });
    const [provinceList, setProvinceList] = useState();
    const [provinceSelected, setProvinceSelected] = useState();
    const [districtList, setDistrictList] = useState();
    const [districtSelected, setDistrictSelected] = useState();
    const [wardList, setWardList] = useState();
    const [wardSelected, setWardSelected] = useState();
    const [detail, setDetail] = useState();

    useEffect(() => {
        if (open) {
            fetchListProvince().then((data) => setProvinceList(data.data));
        }
    }, [open]);

    useEffect(() => {
        if (open && provinceSelected) {
            fetchListDistrictByProvince(provinceSelected).then((data) =>
                setDistrictList(data.data),
            );
        }
    }, [provinceSelected]);

    useEffect(() => {
        if (open && districtSelected) {
            fetchListWardByDistrict(districtSelected).then((data) =>
                setWardList(data.data),
            );
        }
    }, [districtSelected]);

    const handleSubmit = () => {
        fetchUpdJobAddress(jobId, address).then((data) => {
            toast.success(data.message);
            setAddressList(data.data);
            setOpen(false);
        });
    };

    return (
        <>
            <button className="text-primary" onClick={() => setOpen(true)}>
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="responsive-dialog-title"
                maxWidth="700px"
                PaperProps={{
                    style: {
                        width: '700px',
                    },
                }}
            >
                <div className="flex flex-col gap-4 px-7 py-5">
                    <span className="text-lg font-semibold">
                        Địa chỉ cũ:{' '}
                        <span className="text-xl">
                            {oldDetail}, {wardName}, {districtName},{' '}
                            {provinceName}
                        </span>
                    </span>
                    <h3 className="text-lg">Địa chỉ mới</h3>
                    <div>
                        <div className="mb-4 flex gap-3">
                            <FormControl sx={{ width: '400px' }}>
                                <InputLabel id="province-list-label">
                                    Tỉnh/Thành phố
                                </InputLabel>
                                <Select
                                    labelId="province-list-label"
                                    label="Tỉnh/Thành phố"
                                    value={provinceSelected}
                                    onChange={(e) =>
                                        setProvinceSelected(e.target.value)
                                    }
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
                            <FormControl sx={{ width: '400px' }}>
                                <InputLabel id="district-list-label">
                                    Quận/Huyện
                                </InputLabel>
                                <Select
                                    labelId="district-list-label"
                                    label="Quận/Huyện"
                                    value={districtSelected}
                                    onChange={(e) =>
                                        setDistrictSelected(e.target.value)
                                    }
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
                            <FormControl sx={{ width: '400px' }}>
                                <InputLabel id="ward-list-label">
                                    Xã/Phường
                                </InputLabel>
                                <Select
                                    labelId="ward-list-label"
                                    label="Xã/Phường"
                                    value={wardSelected}
                                    onChange={(e) => {
                                        setWardSelected(e.target.value);
                                        setAddress({
                                            ...address,
                                            wardCode: e.target.value,
                                        });
                                    }}
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
                        </div>
                        <TextField
                            fullWidth
                            value={detail}
                            onChange={(e) => {
                                setDetail(e.target.value);
                                setAddress({
                                    ...address,
                                    detail: e.target.value,
                                });
                            }}
                            disabled={!wardSelected}
                            label="Địa chỉ chi tiết"
                            variant="outlined"
                        />
                        <div className="mt-4 flex w-full items-end justify-end gap-5">
                            <button
                                onClick={() => setOpen(false)}
                                className="rounded-md bg-slate-300 px-5 py-2 text-lg font-semibold text-black"
                            >
                                Huỷ
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="rounded-md bg-success px-5 py-2 text-lg font-semibold text-white"
                            >
                                Chỉnh sửa
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
}
