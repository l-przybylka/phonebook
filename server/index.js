const contacts = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

const express = require('express')
const app = express()

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });


app.get('/api/contacts', (req, res) => {
  res.json(contacts)
})

app.get('/api/contacts/:id', (req,res) => {
  const id = Number(req.params.id)
  const contact = contacts.find(contact => contact.id === id)
  
  if(contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/contacts/:id', (res,req) => {
    const id = Number(req.params.id)
    contacts = contacts.filter(contact => contact.id !== id)
})

app.get('/info', (req, res) => {
  res.send(`
  <p>Phonebook has info for ${contacts.length} people</p>
  <p>${new Date()}</p>
  `)
})

// Create server on PORT
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
})