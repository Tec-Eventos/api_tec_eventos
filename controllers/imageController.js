const imageService = require('../services/imageService');
const path = require('path');
const fs = require('fs');


    const uploadImagem = async (req, res) => {
    try {
        console.log('Recebendo requisição de upload:', req.file);
        if (!req.file) {
            return res.status(400).send('Nenhum arquivo enviado.');
        }

        const imagePath = req.file.path;
        const cdEvento = req.body.cdEvento;

        if (!cdEvento) {
            return res.status(400).send('ID do evento não fornecido.');
        }

        const targetPath = path.join(__dirname, `../uploads/${req.file.originalname}`);

        fs.rename(imagePath, targetPath, async (err) => {
            if (err) {
                console.error('Erro ao mover o arquivo para o destino:', err);
                return res.status(500).send('Erro ao mover o arquivo para o destino.');
            }
            console.log('Arquivo movido com sucesso:', targetPath);

            try {
                const insertionResult = await imageService.inserirImagem({
                    cdEvento,
                    caminhoImagem: targetPath
                });

               
                console.log('Upload e inserção no banco de dados realizados com sucesso.');
                res.send('Upload e inserção no banco de dados realizados com sucesso.');
            } catch (error) {
                console.error('Erro ao inserir imagem no banco de dados:', error);
                res.status(500).send('Erro ao inserir imagem no banco de dados.');
            }
        });
    } catch (error) {
        console.error('Erro ao realizar o upload e inserção:', error);
        res.status(500).send('Erro ao realizar o upload e inserção no banco de dados.');
    }

};

module.exports = {
    uploadImagem
};

