import { onValue, push, ref, remove, set, update } from "firebase/database";
import { Task } from '@/types/task';
import { realTimeDatabase } from "./config";

const tasksRef = ref(realTimeDatabase, 'tasks');

export const addTask = async (title: string) => {
  try {
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, {
      title,
      completed: false,
      createdAt: Date.now()
    });
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    await remove(ref(realTimeDatabase, `tasks/${taskId}`));
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId: string, completed: boolean) => {
  try {
    await update(ref(realTimeDatabase, `tasks/${taskId}`), {
      completed
    });
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const updateTaskTitle = async (taskId: string, title: string) => {
  try {
    await update(ref(realTimeDatabase, `tasks/${taskId}`), {
      title
    });
  } catch (error) {
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
        console.error('Error fetching tasks:', error);
        reject(error);
      });
    } catch (error) {
      console.error('Error getting tasks:', error);
      reject(error);
    }
  });
};