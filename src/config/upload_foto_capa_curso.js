const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/capa_curso/');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // mantém .png, .jpg etc
    const uniqueName = `${uuidv4()}${ext}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

module.exports = upload;
