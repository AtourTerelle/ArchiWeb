var express = require('express');
var app = express();
let http = require("http")
var mongoose = require('mongoose')
var bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type,montoken,montoken2');
  next();
})

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

mongoose.connect("mongodb://127.0.0.1:27017/ArchiWeb", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

/*const utilisateursRouter = require('./Router/rou_utilisateurs');
app.use('/utilisateurs', utilisateursRouter);*/
require('./Router/rou_utilisateurs')(app)
require('./Router/rou_materiels')(app)

srv = http.createServer({
},app).listen(5000, function () {
  var port = srv.address().port
  console.log("Le port est : "+port);
})

