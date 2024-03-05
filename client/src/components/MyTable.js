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
    const [nameInput, setNameInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [phoneInput, setPhoneInput] = useState('')
    const [addAllowed, setAddAllowed] = useState(false)
    const [info, setInfo] = useState(null)
    const URL = 'http://localhost:8080/api/users'
    useEffect(() => {
        fetch(URL)
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

    useEffect(() => {
        checkAddAllowed()
    }, [nameInput, emailInput, phoneInput]);

    const handleClickBtnCounter = function () {
        const filtered = users.filter((user => {
            return user.firstName.startsWith(searchString)
        }))
        setCounter(filtered.length)
        setFilteredUsers(filtered)
    }
    const handleNameInput = (event) => {
        setNameInput(event.target.value)
    }
    const handleEmailInput = (event) => {
        setEmailInput(event.target.value)
    }
    const handlePhoneInput = (event) => {
        setPhoneInput(event.target.value)
    }
    const checkAddAllowed = () => {
        if (nameInput.length > 0 && emailInput.length > 0 && phoneInput.length > 0) {
            setAddAllowed(true)
        } else {
            setAddAllowed(false)
        }
    }
    // your code here


    const handleClickAddBtn = () => {
        const [firstName, lastName] = nameInput.split(' ')
        const email = emailInput
        const phone = phoneInput
        const body = {firstName, lastName, phone, email}
        const response = fetch('http://localhost:8080/api/users',
            {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => response.json()).then(data => {
                const newUser = data.user
                if (!!newUser) {
                    setUsers([newUser, ...users])
                    setNameInput('')
                    setEmailInput('')
                    setPhoneInput('')
                }
            })
    }

    return (
        <div>
            <TextField label="Name"
                       onChange={handleNameInput} value={nameInput}/>
            <TextField label="E-mail"
                       onChange={handleEmailInput} value={emailInput}/>
            <TextField label="Phone"
                       onChange={handlePhoneInput} value={phoneInput}/>
            <div>
                <Button variant="contained"
                        disabled={!addAllowed}
                        onClick={handleClickAddBtn}>Add new user</Button>
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