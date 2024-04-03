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
          <div className="p-1 m-1 border-b-4 border-purple-1">Uploading</div>
          {uploading.map((file) => (
            <div className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm">
              {file}
            </div>
          ))}
        </>
      )}
      {downloading.length > 0 && (
        <>
          <div className="p-1 m-1 border-b-4 border-purple-1">Downloading</div>
          {downloading.map((file) => (
            <div className="bg-gray-3 p-1 m-1 hover:bg-gray-4 rounded-sm">
              {file}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
