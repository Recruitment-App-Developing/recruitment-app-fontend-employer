import PreviewUploadItems from './PreviewUploadItems';
import { base64Converter } from '../../utils/base64Converter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const MultipleUploadImages = ({ value, onChange, limit }) => {
    const [images, setImages] = useState(value ?? []);

    const updateImages = (updatedImages) => {
        setImages(updatedImages);
        onChange?.(updatedImages);
    };

    const handleAddImages = async (e) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        const newImages = await Promise.all(
            files.map((file) => base64Converter(file)),
        );
        const updatedImages = [...images, ...newImages];

        if (limit && updatedImages.length > limit) {
            updatedImages.splice(limit);
        }

        updateImages(updatedImages);
    };

    const handleRemoveImage = (img) => {
        const updatedImages = images.filter((image) => image !== img);

        updateImages(updatedImages);
    };

    const handleEditImage = (index, img) => {
        const updatedImages = [...images];
        updatedImages[index] = img;

        updateImages(updatedImages);
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            {images.map((img, index) => (
                <PreviewUploadItems
                    key={img}
                    src={img}
                    onEdit={(e) => handleEditImage(index, e)}
                    onDelete={() => handleRemoveImage(img)}
                />
            ))}
            <div>
                <input
                    type="file"
                    id="multiple-upload-images-input-82j2yw9"
                    className="hidden"
                    multiple
                    onChange={handleAddImages}
                    accept="image/*"
                />
                <label
                    htmlFor="multiple-upload-images-input-82j2yw9"
                    className="mx-3 flex size-10 cursor-pointer items-center justify-center rounded-full
                        border-2 border-sky-500 text-2xl text-sky-500"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </label>
            </div>
        </div>
    );
};

export default MultipleUploadImages;
