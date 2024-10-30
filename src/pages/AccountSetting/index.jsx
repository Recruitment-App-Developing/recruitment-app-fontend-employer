import { useEffect, useState } from 'react';
import MyCompany from './CompanyInfor/MyCompany';
import NoHasComapny from './CompanyInfor/NoHasCompany';
import { fetchMyCompany } from '../../services/companyService';
import { toast } from 'react-toastify';

export default function CompanyInfor() {
    const [companyInfor, setCompanyInfor] = useState();

    useEffect(() => {
        fetchMyCompany().then((data) => {
            setCompanyInfor(data.data);
            toast.success(data.message);
        });
    }, []);

    return (
        <div className="w-full">
            {companyInfor == null ? (
                <NoHasComapny />
            ) : (
                <MyCompany comapny={companyInfor} />
            )}
        </div>
    );
}
