const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/posts/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);

    // gera um nome único
    const uniqueName = crypto.randomUUID() + ext;

    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
