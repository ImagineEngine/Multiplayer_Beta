require('fs')
fetch('https://db.imagineengine.repl.co/room2', {method: 'POST', body: JSON.stringify({'okay':1}), headers: {'Content-Type': 'application/json'}}).then(response => response.text()).then(text => console.log(text))
