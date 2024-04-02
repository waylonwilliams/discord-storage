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
    <div className="absolute bottom-0 bg-white w-1/6">
      {uploading.length > 0 && (
        <>
          <div>Uploading</div>
          {uploading.map((file) => (
            <div className="bg-gray-500">{file}</div>
          ))}
        </>
      )}
      {downloading.length > 0 && (
        <>
          <div>Downloading</div>
          {downloading.map((file) => (
            <div className="bg-gray-500">{file}</div>
          ))}
        </>
      )}
    </div>
  );
}
