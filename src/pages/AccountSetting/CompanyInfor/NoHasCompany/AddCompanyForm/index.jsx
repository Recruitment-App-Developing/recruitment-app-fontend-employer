import { useState } from 'react';
import { industryData } from '../../../../../constants/IndustryData';
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { employerScaleData } from '../../../../../constants/EmployerScaleData';
import { MultiAutocomplete } from '../../../../../components/MultiSelect';
import ReactQuill from 'react-quill';
import AddressComponent from '../../../../../components/AddressComponent';
import { fetchAddCompany } from '../../../../../services/companyService';
import { data } from 'autoprefixer';
import { toast } from 'react-toastify';

export default function AddCompanyForm() {
    const [newCompany, setNewCompany] = useState({
        name: '',
        logo: '',
        urlCom: '',
        email: '',
        phoneNumber: '',
        employeeScale: '',
        taxCode: '',
        activeFields: [],
        briefIntro: '',
        detailIntro: '',
        headQuaters: '',
        subAddress: [],
    });

    const handleChange = (key, value) => {
        setNewCompany((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    console.log('a: ', newCompany);

    const handleAddress = (detail, wardCode) => {
        setNewCompany((prev) => ({
            ...prev,
            headQuaters: detail + ';' + wardCode,
        }));
        console.log(newCompany);
    };

    const handleSubmit = () => {
        fetchAddCompany(newCompany).then((data) => {
            toast.success(data.message);
        });
    };

    return (
        <div>
            <div className="grid grid-cols-2 grid-rows-4 gap-x-4 gap-y-2">
                <TextField
                    fullWidth
                    label="Mã số thuế"
                    value={newCompany.taxCode}
                    onChange={(e) => handleChange('taxCode', e.target.value)}
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Tên công ty"
                    value={newCompany.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Website"
                    placeholder="https://"
                    value={newCompany.urlCom}
                    onChange={(e) => handleChange('urlCom', e.target.value)}
                />
                <FormControl fullWidth>
                    <MultiAutocomplete
                        itemList={industryData}
                        value={newCompany.activeFields.map((item) =>
                            industryData.find(
                                (industry) => industry.id == item,
                            ),
                        )}
                        label="Lĩnh vực hoạt động"
                        placeholder="Lĩnh vực hoạt động"
                        onChange={(e, v) => {
                            handleChange(
                                'activeFields',
                                v.map((item) => item.id),
                            );
                        }}
                    />
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="employer-scale-label">
                        Quy mô nhân viên
                    </InputLabel>
                    <Select
                        labelId="employer-scale-label"
                        label="Quy mô nhân viên"
                        value={newCompany.employeeScale}
                        onChange={(e) =>
                            handleChange('employeeScale', e.target.value)
                        }
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                },
                            },
                        }}
                    >
                        {employerScaleData.map((item) => (
                            <MenuItem key={item} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    label="Email"
                    value={newCompany.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Số điện thoại"
                    value={newCompany.phoneNumber}
                    onChange={(e) =>
                        handleChange('phoneNumber', e.target.value)
                    }
                />
                <TextField
                    fullWidth
                    label="Mô tả ngắn gọn công ty"
                    value={newCompany.briefIntro}
                    onChange={(e) => handleChange('briefIntro', e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <h2>Địa chỉ trụ sở chính</h2>
                <AddressComponent handleChange={handleAddress} />
            </div>
            <div>
                <h4>Mô tả chi tiết công ty</h4>
                <ReactQuill
                    theme="snow"
                    value={newCompany.detailIntro}
                    onChange={(e) => handleChange('detailIntro', e)}
                    placeholder="Nhập vào mô tả"
                />
            </div>
            <button
                onClick={handleSubmit}
                className="rounded-md bg-primary px-7 py-3 text-lg text-white"
            >
                Thêm mới
            </button>
        </div>
    );
}
