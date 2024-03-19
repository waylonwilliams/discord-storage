import React, { useRef } from "react";

const Button: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      console.log("Selected file: ", event.target.files[0]);
      const formData = new FormData();
      formData.set("file", event.target.files[0]); // by accessing index 0 i think this means only the first selected file would be uploaded

      // upload file to backend
      fetch("http://localhost:5000/upload", {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.messageData);
          for (let i = 0; i < data.messageData.length; i++) {
            console.log(data.messageData[i]);
          }
        });
    }
  };

  return (
    <>
      <input
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
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
