# Working with both React and Node.js server

You probably should reinit your project from scratch , in order to have no conflicts between different /node_modules/ folders.

`/client` - is React application your created on the 1st lesson

`/server` - is Node.js server you created on the 2nd lesson

To make them work together, you should run both of them in different terminals.

## Run Node.js server
```bash
cd server
npm install
npm start
```
check it works by opening [http://localhost:8080](http://localhost:8080) in your browser


## Run React application
Open new terminal

```bash
cd client
npm install
npm start
```

Check it works by opening [http://localhost:3000](http://localhost:3000) in your browser.

Happy hacking! now you can use your server as a backend for your frontend application and implement CRUD operations for users - add button to delete user, add button to edit user's fields, add button to view user details, add button to add new user.
