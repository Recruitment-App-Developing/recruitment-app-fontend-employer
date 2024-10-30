import { useState } from 'react';
import cn from '../../../../utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheckCircle,
    faPlus,
    faSearch,
} from '@fortawesome/free-solid-svg-icons';
import CompanyList from './CompanyList';
import AddCompanyForm from './AddCompanyForm';

export default function NoHasComapny() {
    const [isSelected, setIsSelected] = useState('list');

    return (
        <div className="w-full">
            <ul className="flex">
                <li
                    className={cn(
                        `flex w-1/2 cursor-pointer items-center justify-between border border-solid
                        border-slate-200 px-4 py-2`,
                        isSelected === 'list' &&
                            'border-b-4 border-solid border-b-primary',
                    )}
                    onClick={() => setIsSelected('list')}
                >
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex h-9 w-9 items-center justify-center rounded-[50%] bg-primary_light">
                            <FontAwesomeIcon
                                className="text-primary"
                                icon={faSearch}
                            />
                        </div>
                        <div>
                            <p>
                                <b>Tìm kiếm thông tin công ty</b>
                            </p>
                            <span>Dành cho Doanh nghiệp đã có trên TopCV</span>
                        </div>
                    </div>
                    {isSelected === 'list' && (
                        <FontAwesomeIcon
                            className="text-primary"
                            icon={faCheckCircle}
                        />
                    )}
                </li>
                <li
                    className={cn(
                        `flex w-1/2 cursor-pointer items-center justify-between border border-solid
                        border-slate-200 px-4 py-2`,
                        isSelected === 'new' &&
                            'border-b-4 border-solid border-b-primary',
                    )}
                    onClick={() => {
                        setIsSelected('new');
                    }}
                >
                    <div className="flex items-center justify-center gap-8">
                        <div className="flex h-9 w-9 items-center justify-center rounded-[50%] bg-primary_light">
                            <FontAwesomeIcon
                                className="text-primary"
                                icon={faPlus}
                            />
                        </div>
                        <div>
                            <p>
                                <b>Tạo công ty mới</b>
                            </p>
                            <span>
                                Dành cho Doanh nghiệp lần đầu sử dụng TopCV
                            </span>
                        </div>
                    </div>
                    {isSelected === 'new' && (
                        <FontAwesomeIcon
                            className="text-primary"
                            icon={faCheckCircle}
                        />
                    )}
                </li>
            </ul>
            {isSelected === 'list' ? <CompanyList /> : <AddCompanyForm />}
        </div>
    );
}
