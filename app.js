const { NODE_ENV='development', PORT=5000 } = process.env
const express = require('express')
const app = express()

if (NODE_ENV === 'development') app.use(require('morgan')('dev'))
app.use(require('body-parser').json())

app.use((req, res, next) => {
  console.log('In the server!')
  next()
})

app.get('/', (req, res, next) => {
  console.log(req.query)
  res.json({
    message: 'Hello, Express!'
  })
})

app.get('/my/name/is/:name', (req, res, next) => {
  console.log(req.params)
  res.json({
    message: `Hello, ${req.params.name}!`
  })
})

app.get('/ping', (req, res, next) => {
  const status = 200;
  const message = 'pong'
  res.status(status).json({ message })
})


app.post('/message', (req, res) => {
  const { content } = req.body
  const message = 'Message received'
  res.status(201).json({ message, content })
 })

 app.delete('/messages/:id', (req, res, next) => {
  const { id } = req.params
  const message = `Deleted message ${id}`
  res.status(200).json({ message })
})

const listener = () => console.log(`Listening on Port ${PORT}`)
app.listen(PORT, listener)
