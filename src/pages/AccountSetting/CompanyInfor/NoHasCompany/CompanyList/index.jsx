import { Avatar, TextField, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { fetchListCompanyForEmployer } from '../../../../../services/companyService';
import { fetchRegisterCompany } from '../../../../../services/employerService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CompanyList() {
    const navigate = useNavigate();
    const [companyList, setCompanyList] = useState();
    useEffect(() => {
        fetchListCompanyForEmployer().then((data) => setCompanyList(data.data));
    }, []);

    const handleSelectCompany = (comapnyId) => {
        fetchRegisterCompany(comapnyId).then((data) => {
            toast.success(data.message);
            navigate(0);
        });
    };

    return (
        <div className="border border-solid border-slate-200 p-2">
            <div>
                <TextField fullWidth size="small" placeholder="Tên công ty" />
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-2">
                {companyList?.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between gap-2 overflow-hidden text-nowrap rounded-md
                            px-2 py-2 shadow-md"
                    >
                        <div className="flex items-center justify-center gap-2 overflow-hidden text-nowrap">
                            <div className="px-2">
                                <Avatar
                                    src={item?.logo}
                                    sx={{ width: 45, height: 45 }}
                                />
                            </div>
                            <div className="flex flex-col justify-center truncate">
                                <Tooltip title={item?.companyName}>
                                    <b className="truncate">
                                        {item?.companyName}
                                    </b>
                                </Tooltip>
                                <span>MST: {item?.taxCode}</span>
                                <span className="truncate">
                                    {item?.headQuaters}
                                </span>
                                <div className="flex gap-1 overflow-hidden">
                                    {item?.activeFields.map((item, index) => (
                                        <span
                                            key={index}
                                            className="rounded bg-slate-300 px-1"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleSelectCompany(item.id)}
                            className="flex h-8 w-14 items-center justify-center rounded-3xl bg-primary_light px-2 py-1
                                text-primary"
                        >
                            Chọn
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
