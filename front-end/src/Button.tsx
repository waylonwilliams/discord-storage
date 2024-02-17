import { useState } from "react";

export default function Button() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleClick = () => {
    const formData = new FormData();
     formData.append('file', selectedFile);
  };

  return (
    <>
      <button className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full">
        Upload
      </button>

      <input 
        type="file" 
        onChange={handleFileChange} 
        style={{ display: 'none' }} 
        ref={fileInput => this.fileInput = fileInput} 
      />
      <button 
        className="bg-green-300 hover:bg-green-400 text-white font-bold py-2 px-4 rounded-full"
        onClick={() => this.fileInput.click()}
      ></button>
    </>
  );
}
