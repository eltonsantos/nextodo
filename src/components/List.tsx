"use client"

import { CheckCircle2, ClipboardList, Edit2, Hourglass, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { deleteTask, getTasks, updateTaskStatus, updateTaskTitle } from "@/lib/firebase";

interface ListProps {
  refreshTrigger: number;
}

export default function List({ refreshTrigger }: ListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleStatusToggle = async (taskId: string, completed: boolean) => {
    try {
      await updateTaskStatus(taskId, !completed);
      await fetchTasks();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDelete = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
  };

  const handleEdit = async (taskId: string) => {
    if (!editTitle.trim()) return;
    try {
      await updateTaskTitle(taskId, editTitle);
      setEditingTask(null);
      await fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;

  if (loading) {
    return (
      <div className="text-white flex gap-3 justify-center items-center">    
        Buscando tarefas no banco de dados, aguarde... <Hourglass />  
      </div>
    );
  }

  return (
    <>
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 px-6">
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
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-end">
            <div className="flex items-center gap-2">
              <p className="text-blue-400 text-sm font-semibold">Tarefas criadas</p>
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-xl">
                {tasks.length}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-green-600 text-sm font-semibold">Concluídas</p>
              <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded-xl">
                {completedTasks} de {tasks.length}
              </span>
            </div>
          </div>
  
          {tasks.map((task) => (
            <>
              {editingTask === task.id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="flex-1 bg-gray-600 text-white rounded p-4"
                    onKeyUp={(e) => e.key === 'Enter' && handleEdit(task.id)}
                  />
                  <button
                    onClick={() => handleEdit(task.id)}
                    className="text-green-500 hover:text-green-400"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => setEditingTask(null)}
                    className="text-gray-500 hover:text-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <div key={task.id} className="flex justify-between p-4 bg-gray-700 rounded-lg">
                  <button
                    className="flex gap-3 items-center"
                    onClick={() => handleStatusToggle(task.id, task.completed)}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="text-green-600" width={20} height={20} />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-solid border-2 border-blue-400 hover:opacity-70 hover:cursor-pointer"></div>
                    )}
                    <p className={`${task.completed ? "text-gray-500 line-through" : "text-white"}`}>{task.title}</p>
                  </button>
                  <div className="flex gap-3 items-center">
                    <button onClick={() => startEditing(task)}>
                      <Edit2 className="hover:text-yellow-500 text-gray-500" width={20} height={20} />
                    </button>
                    <button onClick={() => handleDelete(task.id)}>
                      <Trash2
                        className="hover:text-red-500 text-gray-500"
                        width={20}
                        height={20}
                      />
                    </button>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      )}
    </>
  );
}
