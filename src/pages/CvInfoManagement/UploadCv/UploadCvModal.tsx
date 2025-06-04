import { faClose, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { fetchUploadCv } from '../../../services/cvInforService';
import useCvUploadProgress from '../../../hooks/useCvUploadProgress';

type FileWithId = {
    id: number;
    file: File;
};

const MAX_FILES = 5;

interface UploadPdfFolderModalProps {
    open: boolean;
    onClose: () => void;
}

const UploadPdfFolderModal: React.FC<UploadPdfFolderModalProps> = ({
    open,
    onClose,
}) => {
    // const sessionId = '89234tysugi';
    const [sessionId, setSessionId] = useState<string | null>(null);
    const progress = useCvUploadProgress({ sessionId: sessionId || '' });

    const [files, setFiles] = useState<FileWithId[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const replaceFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleFolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []).filter(
            (file) => file.type === 'application/pdf',
        );

        const limitedFiles = selectedFiles
            .slice(0, MAX_FILES)
            .map((file, idx) => ({
                id: Date.now() + idx,
                file,
            }));

        setFiles(limitedFiles);
    };

    const handleReplaceFile = (
        index: number,
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const newFile = e.target.files?.[0];
        if (!newFile || newFile.type !== 'application/pdf') return;

        setFiles((prev) =>
            prev.map((f, i) => (i === index ? { ...f, file: newFile } : f)),
        );
    };

    const openFileReplace = (index: number) => {
        replaceFileInputRefs.current[index]?.click();
    };

    const handleRemoveFile = (index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleUpload = () => {
        const temp = () => {
            const id = '2987t3hgiusdg'; // Tạo sessionId duy nhất
            setSessionId(id); // Lưu lại để theo dõi WebSocket
            const formData = new FormData();
            // files.forEach((f, index) => {
            //     formData.append(`cvFiles[${index}]`, f.file);
            // });
            // Array.from(formData.entries()).forEach(([key, value]) => {
            //     console.log(key, value);
            // });
            files.forEach((item) => {
                formData.append('files', item.file);
                formData.append('names', item.id.toString());
            });
            formData.append('sessionId', id);
            // Array.from(formData.entries()).forEach(([key, value]) => {
            //     console.log(key, value);
            // });
            fetchUploadCv(formData);
        };
        temp();

        // Gửi lên backend
        // fetch('/api/upload', {
        //     method: 'POST',
        //     body: formData,
        // })
        //     .then((res) => res.json())
        //     .then((data) => alert('Upload thành công'))
        //     .catch((err) => alert('Lỗi khi upload'));
    };

    const handleResultUpload = () => {};

    return (
        <Dialog
            title="Upload CV"
            open={open}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
            maxWidth="md"
            PaperProps={{
                style: {
                    borderRadius: '8px',
                    width: '900px',
                    height: 'auto',
                    paddingBottom: '30px',
                },
            }}
        >
            <div
                className="flex justify-between rounded-t-lg bg-gradient-to-r from-[#107047] via-[#107047]
                    to-[#09783b] p-[30px]"
            >
                <div>
                    <button onClick={onClose} className="h-4 w-4">
                        <FontAwesomeIcon
                            icon={faClose}
                            className="text-2xl text-white"
                        />
                    </button>
                </div>
            </div>
            <div className="py-6- px-8">
                <p className="my-5 flex flex-col gap-1">
                    <span>
                        Bạn đã có CV của các ứng viên, chỉ cần tải CV lên, hệ
                        thống sẽ giúp bạn quản lý CV của ứng viên
                    </span>

                    <span>
                        Tiết kiệm thời gian, tìm việc ứng viên phù hợp, nắm bắt
                        cơ hội để có thể tìm được ứng viên giúp phát triển công
                        ty
                    </span>
                </p>
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept=".pdf"
                    onChange={handleFolderChange}
                    className="mb-4"
                />

                {files.length > 0 && (
                    <ul className="mb-4">
                        {files.map((f, index) => (
                            <li
                                key={f.id}
                                className="bg-gray-100 mb-2 flex items-center justify-between rounded px-3 py-2"
                            >
                                <span
                                    className="text-blue-600 cursor-pointer underline"
                                    onClick={() => openFileReplace(index)}
                                >
                                    {f.file.name}
                                </span>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="hidden"
                                        ref={(el) =>
                                            (replaceFileInputRefs.current[
                                                index
                                            ] = el)
                                        }
                                        onChange={(e) =>
                                            handleReplaceFile(index, e)
                                        }
                                    />
                                    <button
                                        onClick={() => handleRemoveFile(index)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    className="w-full rounded bg-black px-4 py-2 text-white"
                    onClick={handleUpload}
                >
                    Upload ({files.length})
                </button>
                {sessionId && (
                    <div className="mt-4">
                        <p>
                            Đã xử lý: {progress.done} / {progress.total}
                        </p>
                    </div>
                )}
            </div>
        </Dialog>
    );
};

export default UploadPdfFolderModal;
