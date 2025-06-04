import { useEffect, useRef } from 'react';
import PDFObject from 'pdfobject';

export default function SimplePdfViewer({ cvId }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const fetchPdf = async () => {
            const response = await fetch(
                `http://localhost:8080/api/v1/cv/get-one/${cvId}`,
            );
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            if (PDFObject && typeof PDFObject !== 'boolean') {
                PDFObject.embed(url, containerRef.current);
            }
        };

        fetchPdf();
    }, []);

    return (
        <div className="aspect-[1/1.44] w-[450px] rounded-xl bg-white pl-4">
            <div ref={containerRef} className="h-full w-full" />
        </div>
    );
}
