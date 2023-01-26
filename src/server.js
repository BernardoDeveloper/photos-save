import multer, { diskStorage } from 'multer';
import { supabaseAdmin } from './config/supabase.js';
import nStatic from 'node-static';

import express from 'express';
const app = express();

// set up multer
var storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage })

app.use(express.static('upload/'));

app.use('/images', (req, res) => {
  console.log(express.static('upload/'));

  var fileServer = new nStatic.Server('upload/');
  fileServer.serve(req, res);
});

app.post('/uploadfile', upload.single('filetoupload'), async (req, res) => {  
  console.log(req.body.name);

  await supabaseAdmin.storage
    .from('images')
    .upload('upload/' + req.body.name, upload)

  res.status(200).send({'message' : "file uploaded"});
});

app.listen(3333, () => {
  console.log("Server is running in http://localhost:3333/")
});