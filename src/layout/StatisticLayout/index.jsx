import { useEffect, useState } from 'react';
import SmallBox from './SmallBox';
import { fetchStatisticCvByCompany } from '../../services/applicationService';

const boxList = [
    {
        title: 'TỔNG LƯỢNG CV ỨNG VIÊN',
        number: 0,
        className: 'text-black',
    },
    {
        title: 'CV ỨNG TUYỂN',
        number: 0,
        className: 'text-success',
    },,
    {
        title: 'CV MỞ LIÊN HỆ',
        number: 0,
        className: 'text-red-500',
    },
];

export default function StatisticLayout({ children }) {
    const [statistic, setStatistic] = useState(boxList);

    useEffect(() => {
        fetchStatisticCvByCompany().then((data) => {
            const temp = boxList.map((box, index) => {
                if (index === 0) {
                    return { ...box, number: data.data.numberOfCv };
                } else if (index === 1) {
                    return { ...box, number: data.data.numberOfApplyCv };
                } else if (index === 2) {
                    return { ...box, number: data.data.numberOfOpenContactCv };
                }
                return box;
            });
            setStatistic(temp);
        });
    }, []);

    return (
        <div className="h-full w-full bg-none">
            <div className="mb-3 flex w-full flex-row justify-between">
                {statistic.map((item, index) => (
                    <SmallBox
                        key={index}
                        title={item.title}
                        number={item.number}
                        className={item.className}
                    />
                ))}
            </div>
            <div>{children}</div>
        </div>
    );
}
