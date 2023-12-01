const express = require('express');
const multer = require('multer');
const imageUserController = require('../controllers/imageUserController');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './tmp/uploadsUsers/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
});

// Rota para upload de imagem
router.post('/uploadUser', upload.single('imagem'), imageUserController.uploadImage);

module.exports = router;