'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var routes = require('./routes');
var cars = [];
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.json({ message: 'hi' });
});

app.use('/car', routes);

app.listen(port, function() {
  console.log('Listening on port http://localhost:%d', port);
});

/*app.post('/car',registerCar)

function registerCar(req,res)
{
  console.log('entrou aqui');
  var brandModel = req.body.brandModel;
  var year = req.body.year;
  var plate = req.body.plate;
  var color = req.body.color;
  var image = req.body.image;
  cars.push({
    brandModel : brandModel, 
    year : year,
    plate : plate,
    color : color ,
    image : image
  });
  res.json(cars);
}

app.get('/car',returnCar)

function returnCar(req,res){
  res.send(cars);
}*/
