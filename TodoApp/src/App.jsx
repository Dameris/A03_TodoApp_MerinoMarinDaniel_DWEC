import React, { useState } from 'react'
import Formulario from './components/Formulario'
import TodoList from './components/TodoList'

const initialState = [
  {
    id: 1,
    title: "todo 01",
    description: "Descripcion 01",
    state: "pendiente",
    priority: false,
    state: true
  },
  {
    id: 2,
    title: "todo 02",
    description: "Descripcion 02",
    state: "pendiente",
    priority: false,
    state: true
  }
];

const App = () => {
  // Estado - Lista de componentes
  const [todos, setTodos] = useState(initialState)

  // Funcion addTodo
  const addTodo = todo => {
    // Verificar si la tarea ya existe por su contenido
    if (todos.some(existingTodo => existingTodo.title === todo.title && existingTodo.description === todo.description)) {
      console.error(`Tarea duplicada: ${todo.title}, ${todo.description}`)
      return
    }
  
    setTodos([...todos, todo])
  }

  // Función deleteTodo
  const deleteTodo = id => {
    const newArray = todos.filter(todo => todo.id !== id)
    setTodos(newArray)
  }

  // Función updateTodo
  const updateTodo = id => {
    const newArray = todos.map(todo => {
      if (todo.id === id) {
        todo.state = !todo.state
      }
      return todo
    })
    setTodos(newArray)
  }

  // Función editTodo
  const editTodo = (id, editedTodo) => {
    const newArray = todos.map(todo => (todo.id === id ? editedTodo : todo))
    setTodos(newArray)
  }

  // Función sortedTodos
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.state !== b.state) {
      // Uno completado y el otro pendiente, ordenar por estado
      return a.state ? 1 : -1
    }
  
    // Ambos mismo estado, ordenar por prioridad
    return b.priority - a.priority
  })

  return (
    <div className="container">
      <h1>Formularios</h1>
      <Formulario addTodo={addTodo} editTodo={editTodo} />
      <TodoList todos={sortedTodos} deleteTodo={deleteTodo} updateTodo={updateTodo} editTodo={editTodo} />
    </div>
  )
}

export default App