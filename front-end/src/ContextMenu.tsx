import { location } from "./Props";

export default function ContextMenu({ x, y }: location) {
  return (
    <div className={`absolute bg-gray-700 top-${y} left-${x}`}>
      <ul className="">
        <li className="">Download</li>
        <li className="">Move</li>
        <li className="">Delete</li>
      </ul>
    </div>
  );
}
