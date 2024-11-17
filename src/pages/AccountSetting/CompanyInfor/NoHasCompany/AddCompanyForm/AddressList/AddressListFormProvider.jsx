import { createContext, useState } from 'react';
import { randomId } from '../../../../../../utils/randomId';

export const AddressListFormContext = createContext();

export default function AddressListFormProvider({ children }) {
    const [addressList, setAddressList] = useState([
        {
            id: randomId(),
            province: '',
            district: '',
            ward: '',
            detail: '',
        },
    ]);

    return (
        <AddressListFormContext.Provider
            value={{ addressList, setAddressList }}
        >
            {children}
        </AddressListFormContext.Provider>
    );
}
