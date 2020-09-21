//Go into nodemodules and use express
const express = require('express')
//app is the express function
const app = express()
//go into modules and use body parser, allows it grab things from the index.ejs
const bodyParser = require('body-parser')
//go into nodemodules and use mongodb
const MongoClient = require('mongodb').MongoClient
//
var db, collection;

const url = "mongodb+srv://CarolinD:Carolin23!@cluster0.v6hrh.mongodb.net/demo?retryWrites=true&w=majority";
const dbName = "demo";

//creates server and connects it your database
app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});
//use everything inside the public file and recreate it
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
//
app.use(bodyParser.json())

app.use(express.static('public'))
//going into the root folder (like home page)
app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/messages', (req, res) => {
  db.collection('messages').insertOne({name: req.body.name, msg: req.body.msg, heart: 0, sad:0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => {
  let heart = req.body.heart + 1;
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      heart:heart
    }
  }, {
    //telling it to sort from bottom to top
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.put('/sad', (req, res) => {
  let heart = req.body.heart - 1;
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    $set: {
      heart:heart
    }
  }, {
    //sorts the id's
    sort: {_id: -1},
  //if it did not have such property before add it if its there then update it
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
