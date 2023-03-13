import React from "react";


function MyRow( {id, name, email, phone, setInfo} ) {
    const handleClick = () =>{
        const url = 'http://localhost:8080/api/users/' + id
        const info = fetch(url).then(response => response.json()).then(data => {
                console.log(data.user)
                return data.user
            }
        )

    }

    return (
        <tr key={id} id={`key-${id}`}>
            <td onClick={handleClick}>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>
    )
}

export default MyRow