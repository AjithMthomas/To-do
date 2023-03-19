import React, { useEffect, useRef, useState } from 'react'
import './todo.css'
import { AiFillDelete } from 'react-icons/ai';
import { FiEdit2 } from 'react-icons/fi';
import { IoMdDoneAll } from 'react-icons/io';


function Todo() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId,setEditId] = useState(0)

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const addTodo = () => {
        if (todo !==''){
            setTodos([...todos,{list : todo, id : Date.now(),status:false}])
            setTodo('')
        }
        if(editId){
            const editTodo = todos.find((todo) => todo.id === editId)
            const updateTodo = todos.map((to) => to.id === editTodo.id
            ?(to = {id : to.id ,list : todo})
            :(to = {id : to.id ,list : to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')

        }
    }

    const inputRef = useRef('null')

    useEffect(() => {
        inputRef.current.focus()
    })

    const onDelete = (id) =>{
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    const onComplete = (id) =>{
        let complete = todos.map((todo) =>{
            if(todo.id === id){
                return({...todo,status:!todo.status})
            }
            return todo
        })
        setTodos(complete)
    }

    const onEdit = (id) =>{
        const editTodo = todos.find((todo)=> todo.id === id)
        setTodo(editTodo.list)
        setEditId(editTodo.id)
    }
    console.log(todos)
    return (
        <div className="container">
            <h2>TODO</h2>
            <form className='form-group' onSubmit={handleSubmit}>
                <input type="text" placeholder='Enter your todo!' ref={inputRef} className='form-control' value={todo} onChange={(event) => setTodo(event.target.value)} />
                <button onClick={addTodo}>{editId ?'EDIT' :'ADD'}</button>
            </form>
            <div className='list'>
                <ul>{
                    todos.map((todo) => (
                      
                        <li className='list-items'>
                            <div className='list-item-list'id={todo.status ? 'list-item' : ''}>{todo.list}</div>
                            <span>
                                <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={() =>onComplete(todo.id)} />
                                <FiEdit2 className='list-item-icons' id='edit' title='Edit' onClick={() => onEdit(todo.id)}  />
                                <AiFillDelete className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(todo.id)} />
                            </span>
                        </li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

export default Todo