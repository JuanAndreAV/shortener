require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/shorturl', function(req, res) {
  res.json({ original_url: req.query.url });
});
let url = []
let short_url = []
app.use(bodyParser.urlencoded({extended: false}));

app.post('/api/shorturl', (req, res)=>{
  let original_url = req.body.url
  let foundIndex = url.indexOf(original_url)

  if(original_url.includes("https://") || original_url.includes("http://")){
  if(foundIndex < 0){
    url.push(original_url)
    short_url.push(short_url.length)
    return res.json({
      original_url: original_url,
      short_url: short_url.length - 1
    })
  }else{
    return res.json({
      original_url: original_url,
      short_url: short_url[foundIndex]
    })
  }

  }else {
    
    res.json({error: 'invalid url' })
  }
  
})

app.get('/api/shorturl/:shorturl',(req, res)=>{
  let shorturl = parseInt(req.params.shorturl)
  let found = short_url.indexOf(shorturl) 
  res.redirect(url[found])
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
