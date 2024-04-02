interface Props {
  uploading: string[];
  setUploading: (arg: string[]) => void;
  downloading: string[];
  setDownloading: (arg: string[]) => void;
}

export default function Queue({
  uploading,
  setUploading,
  downloading,
  setDownloading,
}: Props) {
  return (
    <div className="absolute bottom-0 w-full">
      {uploading.length > 0 && (
        <>
          <div className="p-1 m-1 bg-gray-2">Uploading</div>
          {uploading.map((file) => (
            <div className="bg-gray-3 p-1 m-1">{file}</div>
          ))}
        </>
      )}
      {downloading.length > 0 && (
        <>
          <div className="p-1 m-1 bg-gray-2">Downloading</div>
          {downloading.map((file) => (
            <div className="bg-gray-3 p-1 m-1">{file}</div>
          ))}
        </>
      )}
    </div>
  );
}
