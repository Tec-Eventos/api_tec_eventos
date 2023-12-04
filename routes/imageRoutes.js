const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: './tmp/uploads/',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
});

// Rota para upload de imagem
router.post('/upload', upload.single('imagem'), imageController.uploadImage);


//ROTA PARA VISUALIZAR A IMAGEM
router.get('/imagem/:arquivo', imageController.viewImage);

//Rota para ver todas as imagens de um evento só
router.get('/imagem/evento/:cd_evento', imageController.getImagesForEvent);



module.exports = router;