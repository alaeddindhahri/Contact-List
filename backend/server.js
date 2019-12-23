const express = require('express');
const {MongoClient, ObjectID} = require('mongodb');
const bodyParser = require('body-parser');
const assert =require('assert');

const app=express();
app.use(bodyParser.json());

const mongo_url='mongodb://localhost:27017';
const myDb = 'contact-list-db';
let db;
MongoClient.connect(mongo_url,{useUnifiedTopology:true},(err,client)=>{
    assert.equal(err,null,'database connection failed !');
    // const db = client.db(myDb);
    db = client.db(myDb);
})

//get contacts
app.get('/contacts',(req,res)=>{
    db
    .collection('contacts')
    .find()
    .toArray((err,data)=> err?console.log("can't find data !"):res.send(data));
});
//post contact
app.post('/add-contact',(req,res)=>{
    let newContact = req.body;
    db
    .collection('contacts')
    .insertOne(newContact,(err,data)=>err ? console.log("can't add new contact !"):res.send(data));
});
//delete contact
app.delete('/delete-contact/:id',(req,res)=>{
    const contactId = req.params.id;
    db
    .collection('contacts')
    .deleteOne({_id:ObjectID(contactId)},(err,data)=> err?console.log("can't delete this contact !"):res.send(data));
});
//update-put contact
app.put('/update-contact/:id',(req,res)=>{
    const contactId = req.params.id;
    
    db.collection('contacts')
    .findOneAndUpdate(
        {_id: ObjectID(contactId)},
        {$set:req.body},
        (err,data)=>err?console.log("can't update this contact !"):res.send(data)
    );
})

app.listen(6543,(err)=>{
    err?console.log("problem starting the server !"):console.log("server is running...")
})