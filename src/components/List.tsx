import { ClipboardList } from "lucide-react";

export default function List() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <div className="flex items-center gap-2">
          <p className="text-blue-400 text-sm font-semibold">Tarefas criadas</p>
          <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-xl">0</span>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-purple-600 text-sm font-semibold">Concluídas</p>
          <span className="bg-gray-400 text-white text-xs px-2 py-1 rounded-xl">0</span>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 py-16 px-6 border-solid border-t-2 border-gray-400">
        <ClipboardList className="text-white" width={60} height={60} />
        <div className="flex flex-col items-center">
          <strong className="font-bold text-gray-300">
            Você ainda não tem atividades cadastradas
          </strong>
          <span className="text-gray-300">
            Crie tarefas e organize itens a fazer
          </span>
        </div>
      </div>
    </div>
  );
}
