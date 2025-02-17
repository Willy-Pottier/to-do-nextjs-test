"use client";

import { useState, useEffect } from "react";
import { TrashIcon, PlusCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { ReactFormState } from "react-dom/client";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export default function TodoList() {
  // Modification ici pour charger depuis localStorage
    const [todos, setTodos] = useState<Todo[]>(() => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
      }
      return [];
    });

    const [input, setInput] = useState('');

    // Nouveau useEffect pour sauvegarder les changements
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    },[todos]);
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (input.trim()) {
        setTodos([...todos, { id: Date.now(), text: input.trim(), completed: false}]);
        setInput('');
      }
    }

    const toggleTodo = (id: number) => {
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    }

    const deleteTodo = (id: number) => {
      setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
      <div className="max-w-md mx-auto p-4">
        <h1 className="flex text-2xl font-bold mb-4">
        <CheckIcon className="w-6 h-6 text-green-500"/>Todo List</h1>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="flex gap-2">
            <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nouvelle tâche"
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2">
              <PlusCircleIcon className="w-5 h-5"/>
              <span className="hidden sm:inline">Ajouter</span>
            </button>
          </div>
        </form>

        <ul>
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-5 h-5 border rounded-md flex items-center justify-center transition-colors ${
                    todo.completed 
                      ? 'bg-green-500 border-green-500' 
                      : 'border-gray-300 hover:border-green-500'
                  }`}>
                    {todo.completed && (
                  <CheckIcon className="w-4 h-4 text-white" />
                )}
                </button>
                <span className={todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}>
                {todo.text}
              </span>
              </div>
              <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded-md"
            >
              <TrashIcon className="w-5 h-5"/>
            </button>
            </li>
          ))}
        </ul>
      </div>
    )
    }