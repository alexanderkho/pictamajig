const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors');
const multer = require('multer'); 
const db = require('../db/index.js');
require('dotenv').config();

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

app.post('/upload', upload.single('file'), async (req, res) => {
  await db.savePicture(req.file.path, JSON.parse(req.body.tags), req.body.username);
  res.send('yeah mate');
});

app.get('/pictures', async (req, res) => {
  const pictures = await db.getPictures()
  res.json(pictures);
});

app.get('*/storage/:url', async (req, res) => {
  res.sendFile(path.join(__dirname, '../storage/', req.params.url));
});

app.put('/:image_id', async (req, res) => {
  try {
    await db.likePicture(req.params.image_id);
    res.sendStatus(202);
  } catch (e) {
    console.log(e);
    res.sendStatus(404);
  }
})

app.listen(process.env.PORT || 8080);