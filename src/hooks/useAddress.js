import { useContext } from 'react';
import { AddressContext } from '../pages/JobManagement/AddJob/components/Address/AddressContext';
import { randomId } from '../utils/randomId';

export default function useAddress() {
    const { addressTemp, setAddressTemp, addProvince } =
        useContext(AddressContext);

    const addDistrict = (provinceId) => {
        setAddressTemp((prev) => {
            return prev.map((item) => {
                if (item.id == provinceId) {
                    item.items = [
                        ...item.items,
                        { id: randomId(), district: '', ward: '', detail: '' },
                    ];
                }

                return item;
            });
        });
    };

    const updProvince = (province) => {
        setAddressTemp((prev) => {
            return prev.map((item) =>
                item.id == province.id
                    ? {
                          ...province,
                          items: [
                              {
                                  id: randomId(),
                                  district: '',
                                  ward: '',
                                  detail: '',
                              },
                          ],
                      }
                    : item,
            );
        });
    };

    const updDistrict = (provinceId, district) => {
        setAddressTemp((prev) => {
            return prev.map((item) => {
                if (item.id == provinceId) {
                    item.items = item.items.map((item) =>
                        item.id == district.id ? district : item,
                    );
                }
                return item;
            });
        });
    };

    const removeProvince = (provinceId) => {
        setAddressTemp((prev) => prev.filter((item) => item.id != provinceId));
    };

    const removeDistrict = (provinceId, districtId) => {
        setAddressTemp((prev) =>
            prev.map((item) => {
                if (item.id == provinceId) {
                    item.items = item.items.filter((_) => _.id != districtId);
                }
                return item;
            }),
        );
    };

    return {
        addressTemp,
        setAddressTemp,
        addProvince,
        addDistrict,
        updProvince,
        updDistrict,
        removeProvince,
        removeDistrict,
    };
}
