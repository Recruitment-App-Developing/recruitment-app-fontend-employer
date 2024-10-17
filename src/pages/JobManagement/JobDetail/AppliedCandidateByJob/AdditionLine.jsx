import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import cn from '../../../../utils/cn';

export default function AdditionLine({ titile, data, icon }) {
    const className = 'text-success';

    const [expanse, setExpanse] = useState(false);

    let count = data.length;
    if (!expanse && data.length > 2) count = 2;

    return (
        <div>
            <span className="text-lg font-semibold">{titile}</span>
            {data.map((item, index) => {
                if (index > count - 1) return;
                return (
                    <div
                        key={index}
                        className="flex items-center gap-3 pl-2 text-base"
                    >
                        <FontAwesomeIcon icon={icon} />
                        <span>{item}</span>
                    </div>
                );
            })}
            {count > 2 && expanse && (
                <div>
                    <button
                        className={cn(className)}
                        onClick={() => setExpanse(false)}
                    >
                        Thu gọn
                    </button>
                </div>
            )}
            {count > 2 && !expanse && (
                <div>
                    <button
                        className={cn(className)}
                        onClick={() => setExpanse(true)}
                    >
                        Xem thêm ...
                    </button>
                </div>
            )}
            {count === 0 && (
                <div className="flex w-full items-center justify-center">
                    <span>Chưa có thông tin</span>
                </div>
            )}
        </div>
    );
}
