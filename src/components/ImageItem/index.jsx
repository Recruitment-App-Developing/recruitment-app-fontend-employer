import { faCameraAlt, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ImageCropper from '../ImageCropper';
import { base64Converter } from '../../utils/base64Converter';
import cn from '../../utils/cn';
import clsx from 'clsx';

export default function ImageItem({ src, onChange, height, width }) {
    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState();
    const [preview, setPreview] = useState(src);

    useEffect(() => {
        setPreview(src);
    }, [src]);

    const handleInputChnage = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            base64Converter(file).then((result) => {
                setImgSrc(result);
                setPreview(result);
                onChange?.(result);
            });
        }
    };

    const handleImageCrop = (e) => {
        setPreview(e);
        onChange?.(e);
    };

    return (
        <div className="flex items-center gap-4">
            <input
                id="user-avatar"
                className="hidden"
                type="file"
                onChange={handleInputChnage}
            />
            <div
                className={cn(
                    'relative h-20 w-20 rounded-full border',
                    height,
                    width,
                )}
            >
                <img
                    src={preview}
                    alt="User avatar"
                    className="absolute h-full w-full rounded-full object-cover"
                />
                <button
                    onClick={() => setOpen(true)}
                    className={clsx(
                        'absolute h-full w-full items-center justify-center rounded-full',
                        'bg-gray-400/15 text-white',
                        'opacity-0 transition-all hover:opacity-100',
                        imgSrc ? 'flex' : 'hidden',
                    )}
                >
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <label
                    htmlFor="user-avatar"
                    className="bg-gray-100 hover:bg-gray-200 absolute -bottom-2 -right-2 flex h-9 w-9
                        cursor-pointer items-center justify-center rounded-full border"
                >
                    <FontAwesomeIcon icon={faCameraAlt} />
                </label>
            </div>
            <ImageCropper
                open={open}
                onClose={() => setOpen(false)}
                src={imgSrc}
                onCrop={handleImageCrop}
            />
        </div>
    );
}
