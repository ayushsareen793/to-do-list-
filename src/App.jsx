import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const togglefinish = (e) => {
    setshowfinished(!showfinished)

  }

  const handleedit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS()
  }

  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    console.log(todos);


  }
  const handledelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    saveToLS()
  }

  const handlechange = (e) => {
    settodo(e.target.value)
  }

  const handlecheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].iscompleted = !newtodos[index].iscompleted
    settodos(newtodos)

  }




  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-80vh">
        <h1 className='font-bold text-center text-2xl'>i-Task Manage Your Tasks</h1>
        <div className="addtodo my-5">
          <h2 className='text-lg font-bold'>add your todo</h2>
          <input onChange={handlechange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleadd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>save</button>
        </div>
        <input onChange={togglefinish} type="checkbox" value={showfinished} name="" id="" /> show finished
        <h2 className='text-lg font-bold p-2'>your tasks</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {


            return (showfinished || item.iscompleted) && <div key={item.id} className="todo flex w-1/4 my-3 justify-between" >
              <input onChange={handlecheckbox} type="checkbox" checked={todo.iscompleted} name={item.id} id="" />
              <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
              <div className="buttons">
                <button onClick={(e) => { handleedit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-3'>edit</button>
                <button onClick={(e) => { handledelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-3'>delete</button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  )
}

export default App
