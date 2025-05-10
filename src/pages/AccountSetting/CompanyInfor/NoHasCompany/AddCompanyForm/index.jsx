import { useState } from 'react';
import { industryData } from '../../../../../constants/IndustryData';
import {
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
import { toast } from 'react-toastify';
import ImageItem from '../../../../../components/ImageItem';
import { defaultCompnayImage } from '../../../../../constants/defaultImage';
import AddressList from './AddressList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { DEFAULT_BANNER_COMPANY } from '../../../../../assets/images/defaulBannerCompany';

export default function AddCompanyForm() {
    const [image, setImage] = useState(DEFAULT_BANNER_COMPANY);
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
        banner: image,
    });
    const [subAddress, setSubAddress] = useState();

    const handleChange = (key, value) => {
        setNewCompany((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleAddress = (detail, wardCode) => {
        setNewCompany((prev) => ({
            ...prev,
            headQuaters: detail + ';' + wardCode,
        }));
    };

    const handleSubmit = () => {
        const updatedSubAddress = subAddress.map(
            (item) => item.detail + ';' + item.ward,
        );

        const updatedCompany = {
            ...newCompany,
            banner: image,
            subAddress: updatedSubAddress,
        };

        setNewCompany(updatedCompany);
        fetchAddCompany(updatedCompany).then((data) => {
            toast.success(data.message);
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    console.log(image);

    return (
        <div>
            <div className="my-6 flex items-center justify-between px-3">
                <ImageItem
                    onChange={(res) =>
                        setNewCompany({ ...newCompany, logo: res })
                    }
                    src={defaultCompnayImage}
                    height="h-36"
                    width="w-36"
                />
                <div className="relative w-[540px]">
                    <div className="h-[150px] w-[500px] overflow-hidden rounded border bg-white">
                        {image ? (
                            <img
                                src={image}
                                alt="Uploaded"
                                className="h-full w-full object-fill"
                            />
                        ) : (
                            <div className="text-gray-500 flex h-full w-full items-center justify-center">
                                No image uploaded
                            </div>
                        )}
                    </div>
                    <label
                        className="absolute bottom-0 right-0 cursor-pointer rounded bg-none px-3 py-1 text-lg
                            text-success"
                    >
                        <FontAwesomeIcon icon={faUpload} />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>
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
                        onChange={(_, v) => {
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
            <div className="mt-3 flex flex-col gap-4">
                <h2>Địa chỉ chi nhánh</h2>
                {/* {subAddress.map((item, index) => (
                    <AddressComponent
                        key={index}
                        handleChange={handleAddress}
                    />
                ))}
                <button className="text-primary" onClick={handleAddSubAddress}>
                    Thêm chi nhánh mới
                </button> */}
                <AddressList setAddressResult={setSubAddress} />
            </div>
            <div className="my-5">
                <h4>Mô tả chi tiết công ty</h4>
                <ReactQuill
                    theme="snow"
                    value={newCompany.detailIntro}
                    onChange={(e) => handleChange('detailIntro', e)}
                    placeholder="Nhập vào mô tả"
                />
            </div>
            <div className="flex w-full items-end justify-end">
                <button
                    onClick={handleSubmit}
                    className="rounded-md bg-primary px-7 py-2 text-lg text-white"
                >
                    Thêm mới
                </button>
            </div>
        </div>
    );
}
