"use client"

import { addTask } from "@/lib/firebase";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import Loading from "./Loading";

interface InputProps {
  onTaskAdded: () => void;
}

export default function Input({ onTaskAdded }: InputProps) {

  const [title, setTitle] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    if(!title.trim()) return
    
    setIsLoading(true)

    try {
      await addTask(title)
      setTitle("")
      onTaskAdded()
    } catch (error) {
      console.error("Error adding task: ", error)
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="flex gap-2">
      <input
        className="flex-1 bg-gray-700 text-white p-6 rounded-md placeholder:text-gray-300 outline-none"
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        className="flex gap-2 items-center justify-center p-4 rounded-md bg-blue-400 text-white text-sm hover:bg-blue-500 transition-colors lg:min-w-[100px] w-[65px] sm:w-auto"
        onClick={handleSubmit}
        disabled={isLoading || !title.trim()}
      >
        {isLoading ? <Loading /> : "Criar"}
        {!isLoading && (
          <span className="hidden sm:inline-block lg:inline-block xl:inline-block md:inline-block 2xl:inline-block">
            <CirclePlus />
          </span>
        )}
      </button>
    </div>
  );
}
