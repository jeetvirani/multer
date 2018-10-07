const express = require('express');
const multer = require('multer');
const crypto = require('crypto-browserify');
const mime = require("mime");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
    });
  }
});
var upload = multer({ storage: storage });


const app = express();
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});

app.post('/', upload.single('filename'), (req, res) => {
  console.log(req.file);
  console.log("file uploaded..");
  res.redirect('/');
});

app.listen(3000,() => {
		console.log('Express server running on port 3000');
 });