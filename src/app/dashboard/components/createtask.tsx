"use client";
import { useState } from "react";
import axios from "axios";
export default function CreateTask() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [proirity, setProirity] = useState<string>("");
  

  const createTaskHandler = async(e:React.FormEvent) => {
    e.preventDefault();
    try{
        const result = await axios.post("/api/task",{
            title,description,status,priority:proirity
        });
        if(!result.data){
            console.log("Error while creating task!")
        }
    }catch(error){
        console.error(error,"Sever Error while Post req in Task creating")

    }

  };

  return (
    <div>
      <h1 className="text-2xl text-blue-600 mb-4">Add Task</h1>
      <form onSubmit={createTaskHandler} className="flex  gap-y-4">
        <input
          className="p-1 bg-amber-100"
          type="text"
          placeholder="Title task name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="p-1 bg-amber-100"
          type="text"
          placeholder="descriptin"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="p-1 bg-amber-100"
          type="text"
          placeholder="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
        <input
          className="p-1 bg-amber-100"
          type="text"
          placeholder="proirity"
          value={proirity}
          onChange={(e) => setProirity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-orange-500 p-2 rounded text-white text-xl"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
