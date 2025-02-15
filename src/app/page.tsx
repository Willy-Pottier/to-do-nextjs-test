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
        <h1 className="text-2xl font-bold mb-4">Todo List 🚀</h1>
      </div>
    )
    }