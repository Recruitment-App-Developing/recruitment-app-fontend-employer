import { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogActions, Slider } from '@mui/material';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';

export default function ImageCropper({ open, src, onClose, onCrop }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
    }, [src]);

    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, cap) => {
        setCroppedAreaPixels(cap);
    }, []);

    const handleOK = () => {
        getCroppedImg(src, croppedAreaPixels, rotation)
            .then((result) => {
                onCrop?.(result);
                onClose?.();
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <Dialog
            title="Chỉnh sửa hình ảnh"
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
            PaperProps={{
                style: {
                    padding: '30px',
                    width: '650px',
                    height: 'auto',
                },
            }}
        >
            {src && (
                <>
                    <div className="relative h-80 w-full">
                        <Cropper
                            image={src}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1}
                            maxZoom={10}
                            zoomSpeed={2}
                            onRotationChange={setRotation}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className="mt-4">
                        <span>Thu phóng: </span>
                        <Slider
                            value={zoom}
                            min={1}
                            max={10}
                            step={0.1}
                            onChange={(e) => setZoom(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <span>Quay: </span>
                        <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            onChange={(e) => setRotation(e.target.value)}
                        />
                    </div>
                    <DialogActions>
                        <button onClick={handleOK}>Lưu</button>
                        <button onClick={onClose}>Huỷ</button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
}
