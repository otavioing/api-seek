const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		const dir = "./uploads/conversas/";
		fs.mkdirSync(dir, { recursive: true });
		cb(null, dir);
	},
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname);
		const uniqueName = crypto.randomUUID() + ext;
		cb(null, uniqueName);
	},
});

const upload = multer({ storage });

module.exports = upload;