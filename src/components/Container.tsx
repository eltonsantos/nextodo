import Input from "./Input";
import List from "./List";

export default function Container() {
  return (
    <div className="w-[90%] flex flex-col gap-16 md:w-3/4 lg:w-1/2 m-auto mt-[-35px]">
      <Input />
      <List />
    </div>
  );
}
