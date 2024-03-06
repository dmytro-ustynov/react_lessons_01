import React, {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";


function MyRow({id, name, email, phone}) {
    const URL = 'http://localhost:8080/api/users/'
    const [isDeleted, setIsDeleted] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = useState(name)
    const [userEmail, setUserEmail] = useState(email)
    const [userPhone, setUserPhone] = useState(phone)
    const [nameInput, setNameInput] = useState(name)
    const [emailInput, setEmailInput] = useState(email)
    const [phoneInput, setPhoneInput] = useState(phone)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        const url = URL + id
        fetch(url).then(response => response.json()).then(data => {
                console.log(data.user)
                return data.user
            }
        )
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

    const updateUser = () => {
        const url = URL + id
        const [firstName, lastName] = nameInput.split(' ')
        const body = {firstName, lastName, email: emailInput, phone: phoneInput}
        fetch(url, {method: 'PUT', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}})
            .then(response => response.json()).then(data => {
            console.log(data.user)
            const {firstName, email, phone} = data.user
            setNameInput(firstName)
            setEmailInput(email)
            setPhoneInput(phone)
            setUserName(firstName)
            setUserEmail(email)
            setUserPhone(phone)
            setOpen(false)
        })
    }

    return (
        (!isDeleted && <>
                <tr key={id} id={`key-${id}`}>
                    <td>{userName}</td>
                    <td>{userEmail}</td>
                    <td>{userPhone}</td>
                    <td>
                        <button onClick={handleClick}>...</button>
                    </td>
                    <td>
                        <button onClick={removeUser}>-</button>
                    </td>
                    <td>
                        <button onClick={handleClickOpen}> /</button>
                    </td>
                </tr>
                <Dialog open={open}
                        onClose={handleClose}>
                    <DialogTitle>Edit user</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Edit user {name}
                        </DialogContentText>
                        <TextField label="Name"
                                   onChange={handleNameInput} value={nameInput}/>
                        <TextField label="E-mail"
                                   onChange={handleEmailInput} value={emailInput}/>
                        <TextField label="Phone"
                                   onChange={handlePhoneInput} value={phoneInput}/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button variant="contained" onClick={updateUser}>SAVE</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    )
}

export default MyRow