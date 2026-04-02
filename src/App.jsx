import { useState } from 'react'

export default function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const startEdit = (id, text) => {
    setEditId(id)
    setEditText(text)
  }

  const saveEdit = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo)))
    setEditId(null)
  }

  const cancelEdit = () => {
    setEditId(null)
  }

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed))
  }

  const remainingCount = todos.filter((todo) => !todo.completed).length

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">Todo App</h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Add a todo..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTodo}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <div className="mb-4 text-sm font-medium text-gray-600">
          {remainingCount} todo{remainingCount !== 1 ? 's' : ''} left
        </div>

        <div className="space-y-2 mb-6">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer"
              />

              {editId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(todo.id)
                    if (e.key === 'Escape') cancelEdit()
                  }}
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-1 cursor-pointer ${todo.completed ? 'line-through text-gray-400' : ''}`}
                  onClick={() => startEdit(todo.id, todo.text)}
                >
                  {todo.text}
                </span>
              )}

              {editId === todo.id ? (
                <div className="flex gap-1">
                  <button
                    onClick={() => saveEdit(todo.id)}
                    className="px-2 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="px-2 py-1 bg-gray-400 text-white text-sm rounded hover:bg-gray-500 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>

        {todos.some((todo) => todo.completed) && (
          <button
            onClick={clearCompleted}
            className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
          >
            Clear completed todos
          </button>
        )}
      </div>
    </div>
  )
}
