import useAddress from '../../../../../hooks/useAddress';
import AreaItem from './AreaItem';
import { useEffect } from 'react';

export default function AddressCom({ onChange }) {
    const { addressTemp, addProvince } = useAddress();

    useEffect(() => {
        const temp = addressTemp.flatMap((item) =>
            item.items.map((subItem) => `${subItem.detail};${subItem.ward}`),
        );

        console.log('Temp', temp);
        onChange?.(temp);
    }, [addressTemp]);

    return (
        <div className="item-center">
            <div>
                {addressTemp.map((item) => (
                    <AreaItem key={item.id} province={item} />
                ))}
            </div>
            <button
                type="button"
                onClick={addProvince}
                className="mt-2 cursor-pointer rounded-md bg-primary px-3 py-2 text-white"
            >
                Thêm khu vực mới
            </button>
        </div>
    );
}
