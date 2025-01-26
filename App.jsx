import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [finished, setfinished] = useState(true);

  useEffect(() => {
    const todostring = localStorage.getItem("todos");
    if (todostring) {
      settodos(JSON.parse(todostring));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const togglefinish = () => {
    setfinished(!finished);
  };

  const handleedit = (e, id) => {
    e.preventDefault();
    const t = todos.find(item => item.id === id);
    settodo(t.todo);
    const newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos);
  };

  const handledelete = (e, id) => {
    e.preventDefault();
    const newtodos = todos.filter(item => item.id !== id);
    settodos(newtodos);
  };

  const handleadd = (e) => {
    e.preventDefault();
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    settodo("");
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    const id = e.target.name;
    const newtodos = todos.map(item => item.id === id ? { ...item, iscompleted: !item.iscompleted } : item);
    settodos(newtodos);
  };

  return (
    <>
      <Navbar />
      <div className="container bg-violet-300 mx-auto my-3 rounded-xl p-4 font-bold min-h-[90vh] w-1/2">
        <h1 className=" text-2xl font-bold text-center">ITASK-Manage Your Task</h1>
        <div className="line bg-black opacity-40 h-0.5 w-[90%] mx-auto my-4"></div>
        <div className="addtodo text-center">
          <h1 className='heading font-bold my-2 text-xl'>ADD TODO</h1>
          <input onChange={handlechange} value={todo} type="text" className='w-[100%] rounded-xl mx-auto my-3 ' />
          <button onClick={handleadd} disabled={todo.length <= 1} className='cursor-pointer  bg-violet-600 rounded-lg px-4 py-1 mx-2 text-sm hover:bg-violet-900 text-white'>Save</button>
        </div>  
        <div className="finished">
          <input onChange={togglefinish} type="checkbox" checked={finished} />
          <label className='mx-1 my-2'>Show Finished</label>
        </div>
        <h2 className="heading font-bold my-5">YOUR TODOS</h2>
        <div className="todos bg-violet-50 min-w-1/2">
          {todos.length === 0 && <div className="p-5">No todo to display</div>}
          {todos.map(item => (
            (finished || !item.iscompleted) && (
              <div key={item.id} className="todo flex p-1 justify-between">
                <div className='flex gap-5'>
                  <input onChange={handlecheckbox} type="checkbox" checked={item.iscompleted} name={item.id} className="checkbox" />
                  <div className={item.iscompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleedit(e, item.id)} className='cursor-pointer bg-violet-600 rounded-lg px-2 mx-1 text-2sm hover:bg-violet-900 text-white'>Edit</button>
                  <button onClick={(e) => handledelete(e, item.id)} className='cursor-pointer bg-violet-600 rounded-lg px-2 mx-1 text-2sm hover:bg-violet-900 text-white'>Delete</button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  )
}

export default App;
