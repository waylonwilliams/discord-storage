export default function Files() {
  const example_files = [
    "File 1",
    "File 2",
    "File 3",
    "File 4",
    "File 5",
    "File 6",
    "File 7",
    "File 8",
  ];

  return (
    <div className="grid grid-cols-6">
      {example_files.map((file_name) => (
        // outer div to center in column, inner div is each file box
        <div className="flex justify-center">
          <div className="bg-green-50 max-w-44 m-5">
            <img src="/assets/file.png" />
            <div className="text-center">{file_name}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
