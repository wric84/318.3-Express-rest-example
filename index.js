import express from 'express'

import {users} from './data/users.js'
import { posts } from './data/posts.js'


const app = express()
const PORT = 4000

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('api/users/:id', (req, res) => {
    console.log(req.params);
    const user = users.find(user => user.id == req.params.id)
    if (user) {
        res.json(user)
    }else{
        res.json({error: 'User not found'})
    }
})

app.get('/api/posts', (req, res)=>{
    res.json(posts)
})

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(post => post.id == req.params.id)

    if (post) {
        res.json(post)
    }else{
        res.send('error ser not found')
    }
})

app.get('/', (req, res) => {
    res.send('ok')
})

// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// if no other routes have already sent a response!
// We also don't need next(), since this is the
// last stop along the request-response cycle.
app.use((req, res) => {
    res.status(404);
    res.json({ error: "Resource Not Found" });
  });

app.listen(PORT, ()=> console.log(`Server is running on port: ${PORT}`)
)