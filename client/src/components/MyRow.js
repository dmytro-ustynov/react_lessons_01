import React, {useState} from "react";


function MyRow({id, name, email, phone, setInfo}) {
    const URL = 'http://localhost:8080/api/users/'
    const [isDeleted, setIsDeleted] = useState(false)
    const handleClick = () => {
        const url = URL + id
        fetch(url).then(response => response.json()).then(data => {
                console.log(data.user)
                return data.user
            }
        )

    }

    const removeUser = () => {
        if (window.confirm(`remove user ${name} ?`)) {
            const url = URL + id
            fetch(url, {
                method: 'DELETE'
            }).then(response => response.json()).then(data => {
                console.log(data)
                setIsDeleted(true)
            })
        }
    }

    return (
        (!isDeleted && <tr key={id} id={`key-${id}`}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td>
                <button onClick={handleClick}>...</button>
            </td>
            <td>
                <button onClick={removeUser}>-</button>
            </td>
        </tr>)
    )
}

export default MyRow