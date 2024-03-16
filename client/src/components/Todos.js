import {TextField} from "@mui/material";
import {useEffect, useState} from "react";
import Checkbox from '@mui/material/Checkbox';

function TodoList(props) {
    const {todos} = props
    if (!!todos) {
        return (
            <div style={{textAlign: "start"}}>
                User to do list:
                {todos.map((t, index) => <div key={index}><Checkbox checked={t.completed}/>{t.todo}
                </div>)}
            </div>
        )
    } else {
        return <div>not found</div>
    }
}

export default function Todos() {
    const [allTodos, setAllTodos] = useState([])
    const [search, setSearch] = useState('')
    const [todos, setTodos] = useState([])
    useEffect(() => {
        fetch('http://dummyjson.com/todos?limit=150')
            .then(response => response.json())
            .then(data => {
                setAllTodos(data.todos)
            })
    }, []);

    useEffect(() => {
        let selected = allTodos.filter(r => r.userId === parseInt(search))
        setTodos(selected)
    }, [search]);

    return (
        <div>
            <TextField label='Search user by ID' value={search} onInput={(e) => {
                setSearch(e.target.value)
            }}/>

            {todos.length > 0 ? <TodoList todos={todos}/> : <div> user not found</div>}
        </div>
    )
}