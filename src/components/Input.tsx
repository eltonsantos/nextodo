import { CirclePlus } from "lucide-react";

export default function Input() {
  return (
    <div className="flex gap-2">
      <input className="flex-1 bg-gray-500 text-white p-6 rounded-md placeholder:text-gray-300 outline-none" type="text" placeholder="Adicione uma nova tarefa" />
      <button
        className="flex gap-2 items-center p-4 rounded-md bg-blue-400 text-white text-sm hover:bg-blue-light transition-colors">
          Criar
          <CirclePlus />
      </button>
    </div>
  );
}
