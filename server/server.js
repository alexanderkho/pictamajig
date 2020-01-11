const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const multer = require('multer'); 
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const corsOptions  = {
  origin: '*',
  methods: 'GET,POST,PUT',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../storage'),
  filename: (req, file, cb) => {
    cb(null, file.originalname.split('.')[0] + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, '../build')));

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('yeah mate');
});

app.listen(process.env.PORT || 8080);