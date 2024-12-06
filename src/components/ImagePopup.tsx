import React from 'react';
import { FiDownload, FiX } from 'react-icons/fi';

interface ImagePopupProps {
    imageUrl: string;
    onClose: () => void;
}

export const ImagePopup: React.FC<ImagePopupProps> = ({ imageUrl, onClose }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'downloaded-image_AI.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                    aria-label="Close image"
                >
                    <FiX className="w-6 h-6" />
                </button>
                <div className="flex justify-center items-center h-64 overflow-hidden">
                    <img src={imageUrl} alt="Generated" className="object-contain max-h-full" />
                </div>
                <button
                    onClick={handleDownload}
                    className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <FiDownload className="inline w-4 h-4 mr-2" />
                    Download
                </button>
            </div>
        </div>
    );
};
