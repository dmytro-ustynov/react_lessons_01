import React from "react";


function MyRow( {key, name, email, phone} ) {


    return (
        <tr key={key}>
            <td>{name}</td>
            <td>{email}</td>
            <td>{phone}</td>
        </tr>
    )
}

export default MyRow