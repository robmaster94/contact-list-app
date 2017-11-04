var express = require('express')
var app = express()
var mongojs = require('mongojs')
var db = mongojs('contactlist',['contactlist'])
var bodyParser = require('body-parser')

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.json())

app.get('/contactList', (req,res) => {
  console.log("Received GET request");
  db.contactlist.find( (err,docs) => {
    if(err) res.status(404).send({message: 'Error trying to get contacts data'})

    console.log(docs)
    res.json(docs)
  })
})

app.post('/contactList', (req,res) => {
  console.log(req.body)
  db.contactlist.insert(req.body, (err,doc) => {
    if(err) res.status(404).send({message: 'Error inserting contact data'})

    console.log(doc)
    res.json(doc)
  })
})

app.delete('/contactList/:id', (req,res) => {
  var id = req.params.id
  // console.log(id)
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, (err,doc) => {
    if(err) res.status(404).send({message: 'Error deleting contact'})

    console.log(doc)
    res.json(doc)
  })
})

app.get('/contactList/:id', (req,res) => {
  var id = req.params.id
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, (err,doc) => {
    if(err) res.status(404).send({message: 'Error getting contact'})

    console.log(doc)
    res.json(doc)
  })
})

app.put('/contactList/:id', (req,res) => {
  var id = req.params.id;
  console.log(req.body.name)
  db.contactlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, (err,doc) => {
      if(err) res.status(404).send({message: 'Error getting contact'})

      console.log(doc)
      res.json(doc)
    })
  })

app.listen(3000)
console.log("Server running on port 3000")
