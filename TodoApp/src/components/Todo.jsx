import React, { useState } from 'react'

export const Todo = ({ todo, deleteTodo, updateTodo, onEdit }) => {
  const { id, title, description, priority, state } = todo

  const [editing, setEditing] = useState(false)
  const [editedTodo, setEditedTodo] = useState({ ...todo })

  const handleEdit = () => {
    setEditing(!editing)
    setEditedTodo({ ...todo })
  }

  const handleSave = () => {
    setEditing(false);
    onEdit(id, editedTodo)
  }

  return (
    <li className='list-group-item'>
      <div className="d-flex justify-content-between align-items-start">
        <div>
          {editing ? (
            <>
              <input
                type="text"
                name="title"
                value={editedTodo.title}
                onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
              />
              <textarea
                name="description"
                value={editedTodo.description}
                onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
              />
            </>
          ) : (
            <>
              <h5 className={state ? "completada" : ""}>
                {title}
              </h5>
              <p className={state ? "completada" : ""}>
                {description}
              </p>
            </>
          )}

          <div className='d-flex'>
            <button onClick={() => deleteTodo(id)} className='btn btn-sm btn-danger mr-2'>
              Eliminar
            </button>
            {editing ? (
              <>
                <button onClick={handleSave} className='btn btn-sm btn-success mr-2'>
                  Guardar
                </button>
                <button onClick={() => setEditing(false)} className='btn btn-sm btn-warning'>
                  Cancelar
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className='btn btn-sm btn-warning mr-2'>
                Editar
              </button>
            )}
            <button onClick={() => updateTodo(id)} className='btn btn-sm btn-primary'>
              Actualizar Estado
            </button>
          </div>
        </div>
        <span className="badge badge-primary">
          {priority && "prioridad"}
        </span>
      </div>
    </li>
  )
}