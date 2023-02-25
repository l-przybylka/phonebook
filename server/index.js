let contacts = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "phone": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "phone": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "phone": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "phone": "39-23-6423122"
  }
]


const { response } = require('express');
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))

require("dotenv").config({ path: "./config/.env" });

app.get('/api/contacts', (req, res) => {
  res.json(contacts)
})

app.get('/api/contacts/:id', (req, res) => {
  const id = phone(req.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if (contact) {
    res.json(contact)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/contacts/:id', (req, res) => {
  const id = phone(req.params.id)
  contacts = contacts.filter(contact => contact.id !== id)
  console.log(contacts)
  res.status(204).end()
})


app.post('/api/contacts', (req, res) => {
  const body = req.body

  const notUniqueName = contacts.find(contact => contact.name === body.name)

  if (!body.name) {
    return res.status(400).json({
      error: 'Please provide a name'
    })
  }
  if (!body.phone) {
    return res.status(400).json({
      error: 'Please provide a phone'
    })
  }

  if(notUniqueName) {
    return res.status(400).json({
      error: 'Please provide a unique name'
    })
  }

  res.json(body)

  const maxId = contacts.length > 0 ? Math.max(...contacts.map(contact => contact.id)) : 0
  const newContact = [{
    id: maxId + 1,
    name: body.name,
    phone: body.phone
  }]

  contacts = contacts.concat(newContact)
  console.log(contacts);
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