import { useContext } from 'react';
import { randomId } from '../../../../../../utils/randomId';
import { AddressListFormContext } from './AddressListFormProvider';

export default function useAddressList() {
    const { addressList, setAddressList } = useContext(AddressListFormContext);

    const addNewSubAddress = () => {
        setAddressList((prev) => {
            return [
                ...prev,
                {
                    id: randomId(),
                    province: '',
                    district: '',
                    ward: '',
                    detail: '',
                },
            ];
        });
    };

    const updSubAddress = (
        id,
        provinceCode,
        districtCode,
        wardCode,
        detail,
    ) => {
        setAddressList((prev) => {
            return prev.map((item) => {
                if (item.id === id)
                    return {
                        ...item,
                        province: provinceCode,
                        district: districtCode,
                        ward: wardCode,
                        detail: detail,
                    };
                return item;
            });
        });
    };

    return {
        addressList,
        setAddressList,
        addNewSubAddress,
        updSubAddress,
    };
}
