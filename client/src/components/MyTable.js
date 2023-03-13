import {useEffect, useState} from "react";
import {Button, TextField} from "@mui/material";
import MyRow from "./MyRow";


const USERS = [
    {firstName: "John", graduate: 20},
    {firstName: "Robb", graduate: 50},
    {firstName: "Aria", graduate: 80},
    {firstName: "Sansa", graduate: 120},
]

function MyTable() {
    const [counter, setCounter] = useState(0)
    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])
    const [searchString, setSearchString] = useState('')
    const [info, setInfo] = useState(null)

    useEffect(() => {
        const url = 'http://localhost:8080/api/users'
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const formattedData = data.users.map(user => ({
                    id: user.id,
                    firstName: user.firstName,
                    email: user.email,
                    phone: user.phone,
                    picture: user.image
                }));
                setUsers(formattedData);
                setFilteredUsers(formattedData);
                setCounter(filteredUsers.length)
            })
    }, []);

    const handleClickBtnCounter = function () {
        const filtered = users.filter((user => {
            return user.firstName.startsWith(searchString)
        }))
        setCounter(filtered.length)
        setFilteredUsers(filtered)
    }
    const handleTextInput = (event) => {
        setSearchString(event.target.value)
    }

    return (
        <div>
            {info && <div>{info}</div>}
            <div>
                <TextField variant='outlined'
                           onChange={handleTextInput}
                           value={searchString}/>
            </div>
            <div>
                <Button variant="contained"
                        onClick={handleClickBtnCounter}>Search</Button>
            </div>
            <table>
                <tr>
                    <th>User name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
                <tbody>
                {users.map(user => {
                    return (
                        <MyRow name={user.firstName}
                               setInfo={setInfo}
                               id={user.id}
                               email={user.email}
                               phone={user.phone}/>
                    )
                })
                }
                </tbody>
            </table>
        </div>
    )
}

export default MyTable