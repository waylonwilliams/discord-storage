import { location } from "./Props";

export default function ContextMenu({ x, y }: location) {
  console.log(`bg-gray-700 absolute top-[${y - 20}px] left-[${x + 20}]`);
  return (
    <div
      className={`bg-gray-700 absolute`}
      style={{ top: `${y + 12}px`, left: `${x + 5}px` }}
    >
      <ul className="">
        <li className="">Download</li>
        <li className="">Move</li>
        <li className="">Delete</li>
      </ul>
    </div>
  );
}
