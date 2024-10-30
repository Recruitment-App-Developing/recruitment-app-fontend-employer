import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FieldCard from '../FieldCard';
import {
    faAlignLeft,
    faBriefcase,
    faFolderClosed,
    faGlassCheers,
    faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { industryData } from '../../../constants/IndustryData';
import { MultiAutocomplete } from '../../../components/MultiSelect';
import { useEffect, useState } from 'react';
import { workMethodData } from '../../../constants/WorkMethodData';
import { genderData } from '../../../constants/GenderData';
import { rankData } from '../../../constants/RankData';
import { experienceData } from '../../../constants/ExperienceData';
import { moneyTypeData } from '../../../constants/MoneyTypeData';
import { salaryTypeData } from '../../../constants/SalaryTypeData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cn from '../../../utils/cn';
import { splitMoney } from '../../../utils/moneyUtil';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { fetchEditJob } from '../../../services/jobService';
import { toast } from 'react-toastify';
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function JobContentEdit({ jobId, job, setJob }) {
    const classInput = '!text-base';
    const widthEditor = 'w-[1042px]';

    const [salaryType, setSalaryType] = useState('');
    const [moneyType, setMoneyType] = useState('');
    const [moneyNumber, setMoneyNumber] = useState('');

    useEffect(() => {
        const temp = splitMoney(job?.salary || '');
        setSalaryType(temp.salaryType);
        setMoneyType(temp.moneyType);
        setMoneyNumber(temp.moneyNumber);
    }, [job]);

    const handleSubmit = () => {
        fetchEditJob(jobId, job).then((data) => {
            toast.success(data.message);
        });
    };

    const handleChange = (key, value) => {
        setJob((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSalaryType = (e) => {
        setSalaryType(e.target.value);
        const salary = `${e.target.value} ${moneyNumber} ${moneyType}`;
        handleChange('salary', salary);
    };

    const handleMoneyType = (e) => {
        setMoneyType(e.target.value);
        const salary = `${salaryType} ${moneyNumber} ${e.target.value}`;
        handleChange('salary', salary);
    };

    const handleMoneyNumber = (e) => {
        setMoneyNumber(e.target.value);
        const salary = `${salaryType} ${e.target.value} ${moneyType}`;
        handleChange('salary', salary);
    };

    return (
        <div>
            <FieldCard
                title="Tiêu đề tin tuyển dụng"
                icon={<FontAwesomeIcon icon={faGlassCheers} />}
            >
                <Input
                    fullWidth
                    value={job?.name}
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
                            value={job?.mainIndustry || ''}
                            onChange={(e) => {
                                handleChange('mainIndustry', e.target.value);
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
                            value={job?.subIndustries?.map((item) =>
                                industryData.find(
                                    (industry) => industry.id == item,
                                ),
                            )}
                            label="Ngành nghề phụ"
                            placeholder="Ngành nghề phụ"
                            onChange={(_e, v) => {
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
                    <div className="flex items-center justify-center gap-5">
                        <TextField
                            label="Số lượng tuyển dụng"
                            type="number"
                            value={job?.numberOfVacancy || ''}
                            onChange={(e) =>
                                handleChange('numberOfVacancy', e.target.value)
                            }
                            slotProps={{
                                inputLabel: {
                                    shrink: true,
                                },
                            }}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="work-method-label">
                                Loại công việc
                            </InputLabel>
                            <Select
                                labelId="work-method-label"
                                value={job?.workMethod || ''}
                                onChange={(e) =>
                                    handleChange('workMethod', e.target.value)
                                }
                                label="Loại công việc"
                            >
                                {workMethodData.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-4">
                        <FormControl fullWidth>
                            <InputLabel id="gender-label">Giới tính</InputLabel>
                            <Select
                                labelId="gender-label"
                                value={job?.sexRequired || ''}
                                onChange={(e) =>
                                    handleChange('sexRequired', e.target.value)
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
                            <InputLabel id="rank-label">Cấp bậc</InputLabel>
                            <Select
                                labelId="rank-label"
                                label="Cấp bậc"
                                value={job?.jobPosition ?? ''}
                                onChange={(e) =>
                                    handleChange('jobPosition', e.target.value)
                                }
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
                                        },
                                    },
                                }}
                            >
                                {rankData.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
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
                                value={job?.jobExp ?? ''}
                                onChange={(e) =>
                                    handleChange('jobExp', e.target.value)
                                }
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
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
                                    value={moneyType ?? ''}
                                    onChange={handleMoneyType}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {moneyTypeData.map((item) => (
                                        <MenuItem key={item} value={item}>
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
                                    value={salaryType || ''}
                                    onChange={handleSalaryType}
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {salaryTypeData.map((item) => (
                                        <MenuItem key={item} value={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {moneyType && salaryType && (
                                <TextField
                                    label={salaryType}
                                    fullWidth
                                    value={moneyNumber || ''}
                                    onChange={handleMoneyNumber}
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
                        value={job?.jobDescript || ''}
                        onChange={(e) => handleChange('jobDescript', e)}
                        className={cn(widthEditor, 'bg-white')}
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
                        value={job?.jobBenefit || ''}
                        onChange={(e) => handleChange('jobBenefit', e)}
                        className={cn(widthEditor, 'bg-white')}
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
                        value={job?.jobRequirement || ''}
                        onChange={(e) => handleChange('jobRequirement', e)}
                        className={cn(widthEditor, 'bg-white')}
                        placeholder="Nhập vào mô tả yêu cầu với ứng viên"
                    />
                </div>
            </FieldCard>
            <FieldCard
                icon={<FontAwesomeIcon icon={faBriefcase} />}
                title="Thông tin nhận CV"
            >
                <div>
                    {/* <div className="items-start">
                        <LocalizationProvider>
                            <DateTimePicker
                                label="Hạn chót nhận CV"
                                onChange={(e) =>
                                    handleChange('applicationDueTime', e)
                                }
                            />
                        </LocalizationProvider>
                    </div> */}
                    <h4>Thông tin người nhận CV</h4>
                    <div className="flex items-center justify-center gap-3">
                        <TextField fullWidth label="Họ và tên" />
                        <TextField fullWidth label="Số điện thoại" />
                        <TextField fullWidth label="Email" type="email" />
                    </div>
                </div>
            </FieldCard>
            <div className="flex justify-end">
                <Button
                    variant="outlined"
                    onClick={handleSubmit}
                    sx={{ color: 'white', backgroundColor: 'green' }}
                >
                    Chỉnh sửa
                </Button>
            </div>
        </div>
    );
}
