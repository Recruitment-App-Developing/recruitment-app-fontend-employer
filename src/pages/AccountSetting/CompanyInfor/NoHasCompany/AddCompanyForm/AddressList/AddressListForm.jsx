import { useEffect } from 'react';
import SubAddressItem from './SubAddressItem';
import useAddressList from './useAddressList';

export default function AddressListForm({ setAddressResult }) {
    const { addressList, addNewSubAddress } = useAddressList();

    useEffect(() => {
        setAddressResult(addressList);
    }, [addressList]);

    return (
        <div>
            {addressList.map((item, index) => (
                <SubAddressItem
                    key={index}
                    id={item.id}
                    provinceInit={item.province}
                    districtInit={item.district}
                    wardInit={item.ward}
                    detailInit={item.detail}
                />
            ))}
            <button className="text-primary" onClick={addNewSubAddress}>
                Thêm chi nhánh mới
            </button>
        </div>
    );
}
