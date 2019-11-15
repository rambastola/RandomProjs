'use strict'


const Fs = require('fs')  
const Path = require('path')  
const Axios = require('axios')

var express = require("express");
var app = express();


app.set('port', process.env.PORT || 8080);


async function downloadImage () {  
    const url = 'http://www.pdf995.com/samples/pdf.pdf'
    const path = Path.resolve(__dirname, 'files', 'code.pdf')
    const writer = Fs.createWriteStream(path)
  
    const response = await Axios({
      url,
      method: 'GET',
      responseType: 'stream'
    })
  
    response.data.pipe(writer)
    console.log(response.data)
  
    return new Promise((resolve, reject) => {
      writer.on('finish', resolve)
      writer.on('error', reject)
    })
  }
  
  

app.get('/', function(req, res){
    // res.send('hello vffworld');
    downloadImage();
});













app.listen(app.get('port'));




