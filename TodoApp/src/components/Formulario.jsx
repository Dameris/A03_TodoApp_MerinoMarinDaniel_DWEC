import { useState } from "react"
import Swal from "sweetalert2"

const Formulario = ({ addTodo }) => {

  const [todo, setTodo] = useState({
    title: "todo 01",
    description: "Descripcion 01",
    state: "pendiente",
    priority: false
  })

  const { title, description, priority, state } = todo

  const handleSubmit = e => {
    e.preventDefault()

    if (title.trim() === "" || description.trim() === "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algo va mal...!",
      });
    }

    addTodo({
      ...todo,
      id: Date.now(),
      // state: state === "completada"? true:false
      state: state == "completada"

    })

    console.log(`Enviando ${todo.title}, ${todo.description} y ${todo.state} al servidor...`)

  }

  const handlechange = e => {
    const { name, type, checked, value } = e.target
    setTodo({
      ...todo,
      [name]: type === "checkbox" ? checked : value

    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Introduce nombre de la tarea"
          type="text"
          className="form-control mb-2"
          value={todo.title}
          onChange={handlechange}
        />
        <textarea
          name="description"
          placeholder="Introduce la descripcion"
          className="form-control mb-2"
          value={todo.description}
          onChange={handlechange}

        />
        <select
          name="state"
          className="form-control mb-2"
          value={todo.state}
          onChange={handlechange}
        >
          <option value="pendiente">Pendiente</option>
          <option value="completada">Completada</option>
        </select>

        {/* Añadimos el checkbox */}
        <div className="form-checked mb-2">
          <input
            className="form-checked-input"
            type="checkbox"
            name="priority"
            id="inputchecked"
            checked={todo.priority}
            onChange={handlechange}
          />
          <label
            htmlFor="inputchecked"
            className="form-checked-label"
          >
            Prioridad
          </label>
        </div>

        <button
          type="submit"
          className='btn btn-primary'
        >
          Añadir
        </button>
      </form>
    </div>
  )
}

export default Formulario