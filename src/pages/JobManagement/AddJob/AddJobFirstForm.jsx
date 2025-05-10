import AddressCom from './components/Address/AddressCom';
import {
    faAlignLeft,
    faBriefcase,
    faFolderClosed,
    faGlassCheers,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import FieldCard from './FieldCard';

import { useState } from 'react';
import ReactQuill from 'react-quill';
import { clsx } from 'clsx';
import AddressProvider from './components/Address/AddressContext';
import { industryData } from '../../../constants/IndustryData';
import { workMethodData } from '../../../constants/WorkMethodData';
import { genderData } from '../../../constants/GenderData';
import { rankData } from '../../../constants/RankData';
import { experienceData } from '../../../constants/ExperienceData';
import { moneyTypeData } from '../../../constants/MoneyTypeData';
import {
    SALARY_ABOUT,
    SALARY_TO,
    salaryTypeData,
} from '../../../constants/SalaryTypeData';
import { MultiAutocomplete } from '../../../components/MultiSelect';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { formatMoney, formatMoneyToInt } from '../../../utils/common';

export default function AddJobFirstForm({ job, setJob }) {
    const classInput = '!text-base';
    const widthEditor = 'w-[1042px]';

    const [salaryType, setSalaryType] = useState('');
    const [moneyType, setMoneyType] = useState('');

    const handleChange = (key, value) => {
        setJob((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <div className="bg-none">
            <div className="flex flex-col gap-3">
                <h1>Thông tin đăng tuyển chi tiết</h1>
                <FieldCard
                    title="Tiêu đề tin tuyển dụng"
                    icon={<FontAwesomeIcon icon={faGlassCheers} />}
                >
                    <Input
                        fullWidth
                        placeholder="VD: Nhân viên Marketing"
                        value={job.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        inputProps={{
                            className: classInput,
                        }}
                    />
                </FieldCard>
                <FieldCard
                    title="Ngành nghề & lĩnh vực"
                    icon={<FontAwesomeIcon icon={faFolderClosed} />}
                >
                    <div className="flex items-center gap-5">
                        <FormControl sx={{ width: 300 }}>
                            <InputLabel id="main-industry-label">
                                Ngành nghề chính
                            </InputLabel>
                            <Select
                                fullWidth
                                labelId="main-industry-label"
                                id="main-industry"
                                value={job.mainIndustry}
                                onChange={(e) => {
                                    handleChange(
                                        'mainIndustry',
                                        e.target.value,
                                    );
                                }}
                                label="Ngành nghề chính"
                                inputProps={{ className: classInput }}
                            >
                                {industryData.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <MultiAutocomplete
                                itemList={industryData}
                                value={job.subIndustries.map((item) =>
                                    industryData.find(
                                        (industry) => industry.id == item,
                                    ),
                                )}
                                label="Ngành nghề phụ"
                                placeholder="Ngành nghề phụ"
                                onChange={(e, v) => {
                                    handleChange(
                                        'subIndustries',
                                        v.map((item) => item.id),
                                    );
                                }}
                            />
                        </FormControl>
                    </div>
                </FieldCard>
                <FieldCard
                    icon={<FontAwesomeIcon icon={faInfoCircle} />}
                    title="Thông tin chung"
                >
                    <div>
                        <div>
                            <div className="flex items-center justify-center gap-5">
                                <TextField
                                    label="Số lượng tuyển dụng"
                                    type="number"
                                    value={job.numberOfVacancy}
                                    onChange={(e) =>
                                        handleChange(
                                            'numberOfVacancy',
                                            e.target.value,
                                        )
                                    }
                                />
                                <FormControl fullWidth>
                                    <InputLabel id="work-method-label">
                                        Loại công việc
                                    </InputLabel>
                                    <Select
                                        labelId="work-method-label"
                                        value={job.workMethod}
                                        onChange={(e) =>
                                            handleChange(
                                                'workMethod',
                                                e.target.value,
                                            )
                                        }
                                        label="Loại công việc"
                                    >
                                        {workMethodData.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="mt-2 flex items-center justify-center gap-4">
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">
                                        Giới tính
                                    </InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        value={job.sexRequired}
                                        onChange={(e) =>
                                            handleChange(
                                                'sexRequired',
                                                e.target.value,
                                            )
                                        }
                                        label="Giới tính"
                                    >
                                        {genderData.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="rank-label">
                                        Cấp bậc
                                    </InputLabel>
                                    <Select
                                        labelId="rank-label"
                                        label="Cấp bậc"
                                        value={job.jobPosition}
                                        onChange={(e) =>
                                            handleChange(
                                                'jobPosition',
                                                e.target.value,
                                            )
                                        }
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200, // Giới hạn chiều cao của danh sách
                                                },
                                            },
                                        }}
                                    >
                                        {rankData.map((item) => (
                                            <MenuItem
                                                key={item.id}
                                                value={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="experience-label">
                                        Kinh nghiệm
                                    </InputLabel>
                                    <Select
                                        labelId="experience-label"
                                        label="Kinh nghiệm"
                                        value={job.jobExp}
                                        onChange={(e) =>
                                            handleChange(
                                                'jobExp',
                                                e.target.value,
                                            )
                                        }
                                        MenuProps={{
                                            PaperProps: {
                                                style: {
                                                    maxHeight: 200, // Giới hạn chiều cao của danh sách
                                                },
                                            },
                                        }}
                                    >
                                        {experienceData.map((item) => (
                                            <MenuItem key={item} value={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                            <h4 className="my-4">Mức lương</h4>
                            <div className="flex flex-col">
                                <div className="flex items-center justify-center">
                                    <FormControl fullWidth>
                                        <InputLabel id="money-type-label">
                                            Loại tiền tệ
                                        </InputLabel>
                                        <Select
                                            labelId="money-type-label"
                                            label="Loại tiền tệ"
                                            value={moneyType}
                                            onChange={(e) => {
                                                setMoneyType(e.target.value);
                                                handleChange(
                                                    'salaryUnit',
                                                    e.target.value,
                                                );
                                            }}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200, // Giới hạn chiều cao của danh sách
                                                    },
                                                },
                                            }}
                                        >
                                            {moneyTypeData.map((item) => (
                                                <MenuItem
                                                    key={item}
                                                    value={item}
                                                >
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <InputLabel id="salary-type-label">
                                            Kiểu lương
                                        </InputLabel>
                                        <Select
                                            labelId="salary-type-label"
                                            label="Kiểu lương"
                                            value={salaryType}
                                            onChange={(e) => {
                                                setSalaryType(e.target.value);
                                                handleChange(
                                                    'salaryType',
                                                    e.target.value,
                                                );
                                            }}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: 200, // Giới hạn chiều cao của danh sách
                                                    },
                                                },
                                            }}
                                        >
                                            {salaryTypeData.map((item) => (
                                                <MenuItem
                                                    key={item.code}
                                                    value={item.code}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {moneyType &&
                                        salaryType &&
                                        salaryType !== SALARY_TO && (
                                            <TextField
                                                label={
                                                    salaryType === SALARY_ABOUT
                                                        ? 'Từ'
                                                        : salaryTypeData.find(
                                                              (item) =>
                                                                  item.code ===
                                                                  salaryType,
                                                          )?.name
                                                }
                                                fullWidth
                                                value={formatMoney(
                                                    job.salaryFrom,
                                                )}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'salaryFrom',
                                                        formatMoneyToInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {moneyType}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    {moneyType &&
                                        (salaryType === SALARY_ABOUT ||
                                            salaryType === SALARY_TO) && (
                                            <TextField
                                                label="Đến"
                                                fullWidth
                                                value={formatMoney(
                                                    job.salaryTo,
                                                )}
                                                onChange={(e) =>
                                                    handleChange(
                                                        'salaryTo',
                                                        formatMoneyToInt(
                                                            e.target.value,
                                                        ),
                                                    )
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            {moneyType}
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                </div>
                                <div>
                                    <h4 className="my-4">Khu vực làm việc</h4>
                                    <AddressProvider>
                                        <AddressCom
                                            onChange={(e) =>
                                                handleChange('addressList', e)
                                            }
                                        />
                                    </AddressProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                </FieldCard>
                <FieldCard
                    icon={<FontAwesomeIcon icon={faAlignLeft} />}
                    title="Nội dung tuyển dụng chi tiết"
                >
                    <div className="w-full">
                        <h4>Mô tả công việc</h4>
                        <ReactQuill
                            theme="snow"
                            value={job.jobDescript}
                            onChange={(e) => handleChange('jobDescript', e)}
                            className={clsx(widthEditor, 'bg-white')}
                            placeholder="Nhập vào mô tả công việc"
                        />
                    </div>
                </FieldCard>
                <FieldCard
                    icon={<FontAwesomeIcon icon={faAlignLeft} />}
                    title="Quyền lợi ứng viên"
                >
                    <div>
                        <h4>Mô tả quyền lợi ứng viên</h4>
                        <ReactQuill
                            theme="snow"
                            value={job.jobBenefit}
                            onChange={(e) => handleChange('jobBenefit', e)}
                            className={clsx(widthEditor, 'bg-white')}
                            placeholder="Nhập vào mô tả quyền lợi ứng viên"
                        />
                    </div>
                </FieldCard>
                <FieldCard
                    icon={<FontAwesomeIcon icon={faAlignLeft} />}
                    title="Yêu cầu ứng viên"
                >
                    <div>
                        <h4>Mô tả yêu cầu ứng viên</h4>
                        <ReactQuill
                            theme="snow"
                            value={job.jobRequirement}
                            onChange={(e) => handleChange('jobRequirement', e)}
                            className={clsx(widthEditor, 'bg-white')}
                            placeholder="Nhập vào mô tả yêu cầu với ứng viên"
                        />
                    </div>
                </FieldCard>
                <FieldCard
                    icon={<FontAwesomeIcon icon={faBriefcase} />}
                    title="Thông tin nhận CV"
                >
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label="Hạn chót nhận CV"
                                defaultValue={dayjs(new Date())}
                                onChange={(v) =>
                                    handleChange('applicationDueTime', v)
                                }
                                format="HH:mm DD/MM/YYYY"
                            />
                        </LocalizationProvider>
                        <h4>Thông tin người nhận CV</h4>
                        <div className="flex items-center justify-center gap-3">
                            <TextField
                                fullWidth
                                label="Họ và tên"
                                onChange={(e) =>
                                    handleChange('receiverName', e.target.value)
                                }
                            />
                            <TextField
                                fullWidth
                                label="Số điện thoại"
                                onChange={(e) =>
                                    handleChange(
                                        'receiverPhone',
                                        e.target.value,
                                    )
                                }
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                onChange={(e) =>
                                    handleChange(
                                        'receiverEmail',
                                        e.target.value,
                                    )
                                }
                            />
                        </div>
                    </div>
                </FieldCard>
            </div>
        </div>
    );
}
