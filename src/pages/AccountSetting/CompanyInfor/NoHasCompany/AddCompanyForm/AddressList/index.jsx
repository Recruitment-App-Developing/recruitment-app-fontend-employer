import AddressListForm from './AddressListForm';
import AddressListFormProvider from './AddressListFormProvider';

export default function AddressList({ setAddressResult }) {
    return (
        <AddressListFormProvider>
            <AddressListForm setAddressResult={setAddressResult} />
        </AddressListFormProvider>
    );
}
