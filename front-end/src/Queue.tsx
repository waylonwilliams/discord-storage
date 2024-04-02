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
      {uploading.length !== 0 && downloading.length !== 0 && (
        <>
          <div>Uploading</div>
          <div>Downloading</div>
        </>
      )}
    </div>
  );
}
