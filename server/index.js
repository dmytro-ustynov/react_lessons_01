import express from "express"
import * as path from "path";
import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'
import cors from "cors";
import * as uuid from "uuid";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert {type: "json"};

const app = express()
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())

app.use(cors())

// your code here

const __dirname = path.dirname('')
const dbFileName = path.resolve(__dirname, 'data', 'users.json')
const adapter = new JSONFile(dbFileName)
const db = new Low(adapter)
await db.read()
db.data ||= {users: []}

app.get('/', (req, res) => {
    res.json({msg: 'hello from server'})
})

app.get('/api/users', (req, res) => {
    const users = db.data.users
    res.json({users})
})

app.get('/api/users/:id', async (req, res) => {
    const {id} = req.params
    if (!id) {
        res.status(400).json({msg: 'id is required'})
    }
    const user = db.data.users.filter(user => user.id == id)[0]

    res.json({id, user})
})

app.post('/api/users', async (req, res) => {
    const id = uuid.v4()
    const user = {...req.body, id}
    db.data.users.push(user)
    await db.write()
    res.json({id})
})

app.delete('/api/users/:id', async (req, res) => {
    const {id} = req.params
    if (!id) {
        res.status(400).json({msg: 'id is required'})
    }
    db.data.users = db.data.users.filter(user => user.id !== id)
    await db.write()
    res.json({msg: 'OK, deleted ' + id})
})

app.put('/api/users/:id', async (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).json({msg: 'id is required'})
        return
    }
    let updatedUser
    const updatedUsers = db.data.users.map(user => {
        if (user.id == id) {
            updatedUser = {...user, ...req.body}
            return updatedUser
        }
        return user
    })
    if (!updatedUser){
        res.status(404).json('User not found')
    } else {
        db.data.users = updatedUsers
        await db.write()
        res.json({user: updatedUser});
    }
});

app.listen(8080, () => {
    console.log("Server started at 8080 port")
})