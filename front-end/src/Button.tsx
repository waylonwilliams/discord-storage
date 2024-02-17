import React, { useState, useRef, useEffect } from 'react';

const Button: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    }
  }, [selectedFile]);

  return (
    <>
      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        ref={fileInputRef} 
      />
      <button 
        className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload
      </button>
    </>
  );
};

export default Button;
