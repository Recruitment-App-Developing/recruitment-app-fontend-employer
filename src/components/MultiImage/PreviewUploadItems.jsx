import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenAlt, faXmark } from '@fortawesome/free-solid-svg-icons';
import ImageCropper from '../ImageCropper';

const PreviewUploadItems = ({ src, onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);
    const [preview, setPreview] = useState(src);

    useEffect(() => {
        setPreview(src);
    }, [src]);

    const handleEdit = (img) => {
        setPreview(img);
        onEdit?.(img);
    };

    return (
        <div className="relative size-36 rounded-lg border">
            <img
                src={preview}
                alt=""
                className="absolute size-full rounded-lg object-cover"
            />
            <button
                onClick={() => setOpen(true)}
                className="bg-gray-400/15 absolute z-10 flex size-full items-center justify-center
                    rounded-lg text-white opacity-0 transition-all hover:opacity-100"
            >
                <FontAwesomeIcon icon={faPenAlt} />
            </button>
            <button
                className="absolute right-0 top-0 z-20 flex size-5 -translate-y-1/2 translate-x-1/2
                    items-center justify-center rounded-full bg-rose-500 text-sm text-white"
                onClick={onDelete}
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
            <ImageCropper
                open={open}
                onClose={() => setOpen(false)}
                src={preview}
                onCrop={handleEdit}
            />
        </div>
    );
};

export default PreviewUploadItems;
