import { useEffect, useState } from 'react';
import { fetchListJobAddressByJob } from '../../../../services/jobService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import AddressEditModal from './AddressEditModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default function AddressEdit({ jobId }) {
    const [addressList, setAddressList] = useState([]);
    const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

    useEffect(() => {
        fetchListJobAddressByJob(jobId).then((data) =>
            setAddressList(data.data),
        );
    }, [jobId]);

    return (
        <div className="flex flex-col gap-3 pl-3">
            {addressList?.map((item, index) => (
                <div className="flex gap-3 text-lg" key={index}>
                    <span>Địa điểm {index + 1}: </span>
                    <div>
                        Tỉnh: <b>{item.provinceName}</b>
                    </div>{' '}
                    <div>
                        Quận/Huyện: <b>{item.districtName}</b>
                    </div>
                    <div>
                        Xã/Phường: <b>{item.wardName}</b>
                    </div>
                    <div>
                        Địa chỉ chi tiết: <b>{item.detail}</b>
                    </div>
                    <div className="ml-3 flex gap-4">
                        <ConfirmDeleteModal
                            open={openConfirmDelete}
                            setOpen={setOpenConfirmDelete}
                            jobId={jobId}
                            jobAddressId={item.jobAddressId}
                            detail={item.detail}
                            wardName={item.wardName}
                            districtName={item.districtName}
                            provinceName={item.provinceName}
                            setAddressList={setAddressList}
                        />
                        <AddressEditModal
                            jobId={jobId}
                            jobAddressId={item.jobAddressId}
                            oldDetail={item.detail}
                            wardName={item.wardName}
                            districtName={item.districtName}
                            provinceName={item.provinceName}
                            setAddressList={setAddressList}
                        />
                        <button
                            onClick={() => {
                                setOpenConfirmDelete(true);
                            }}
                            className="text-rose-400"
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
