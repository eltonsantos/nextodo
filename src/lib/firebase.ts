import { onValue, push, ref, remove, set, update } from "firebase/database";
import { Task } from '@/types/task';
import { realTimeDatabase } from "./config";
import { toast } from "react-toastify";

const tasksRef = ref(realTimeDatabase, 'tasks');

export const addTask = async (title: string) => {
  try {
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, {
      title,
      completed: false,
      createdAt: Date.now()
    });
    toast.success("Tarefa criada com sucesso");
  } catch (error) {
    toast.error('Error adding task:' + error);
    console.error('Error adding task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await remove(ref(realTimeDatabase, `tasks/${taskId}`));
    toast.success("Tarefa removida com sucesso");
  } catch (error) {
    toast.error('Error deleting task:' + error);
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, completed: boolean) => {
  try {
    await update(ref(realTimeDatabase, `tasks/${taskId}`), {
      completed
    });
    toast.success("Tarefa atualizada com sucesso");
  } catch (error) {
    toast.error('Error updating task:' + error);
    console.error('Error updating task:', error);
    throw error;
  }
};

export const updateTaskTitle = async (taskId: string, title: string) => {
  try {
    await update(ref(realTimeDatabase, `tasks/${taskId}`), {
      title
    });
    toast.success("Tarefa atualizada com sucesso");
  } catch (error) {
    toast.error('Error updating task:' + error);
    console.error('Error updating task:', error);
    throw error;
  }
};

export const getTasks = async (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    try {
      onValue(tasksRef, (snapshot) => {
        const tasksData: Task[] = [];
        snapshot.forEach((childSnapshot) => {
          const task = {
            id: childSnapshot.key!,
            ...childSnapshot.val(),
            createdAt: new Date(childSnapshot.val().createdAt)
          } as Task;
          tasksData.push(task);
        });
        tasksData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        resolve(tasksData);
      }, (error) => {
        toast.error('Error fetching task:' + error);
        console.error('Error fetching tasks:', error);
        reject(error);
      });
    } catch (error) {
      toast.error('Error getting task:' + error);
      console.error('Error getting tasks:', error);
      reject(error);
    }
  });
};