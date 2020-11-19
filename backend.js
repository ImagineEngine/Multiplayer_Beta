console.log('server is starting')
var express = require('express')
const fs = require('fs')

var raw_data = fs.readFileSync('data.json')

var file = JSON.parse(raw_data);

var app = express()

var server = app.listen(3000, listening)

function listening(){
  console.log('listening...')
}

app.use(express.static('website'));
app.use(express.json())
app.get('/room/:data', update)
app.post('/room2', transfer)

function transfer(request, response){
  console.log(request.body)
  response.send(JSON.stringify(file))
}


function update(request, response){
  var data = request.params
  file[data['data']] = 1
  fs.writeFile("data.json", JSON.stringify(file), a)
  console.log(data['data'])
  response.send('hello there')
}


function a(){}
