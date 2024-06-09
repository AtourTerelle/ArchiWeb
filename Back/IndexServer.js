const express = require('express');
const app = express();

var mongoose = require('mongoose')

console.log("le test la");

mongoose.connect("mongodb://127.0.0.1:27017/ArchiWeb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
  }); 
  
app.listen(5000, ()=> {
    console.log("le port batard");
});

