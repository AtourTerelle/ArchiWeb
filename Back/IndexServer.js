const express = require('express');
const app = express();

console.log("le test la");

app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  

  
app.listen(5000, ()=> {
    console.log("le port batard");
});