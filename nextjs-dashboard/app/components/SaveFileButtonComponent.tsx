// SaveFileButtonComponent.tsx
import React from 'react';

interface SaveFileButtonProps {
    imageData: string;
}

export default function SaveFileButton({ imageData }: SaveFileButtonProps){
    const handleDownload = () => {
        // Create a temporary anchor element
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:image/jpeg;base64,${imageData}`;
        downloadLink.download = 'untitled.jpg'; // Default filename

        // Trigger the download
        downloadLink.click();
    };

    return (
        <button onClick={handleDownload} style={buttonStyle}>
            Download Image
        </button>
    );
};

// Button styles (you can adjust this to your needs)
const buttonStyle = {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
};