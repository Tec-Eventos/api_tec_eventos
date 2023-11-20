const imageService = require('../services/imageService');
const path = require('path');
const fs = require('fs');

const uploadImagem = async (req, res) => {
    try {
        const imagePath = req.file.path; // Caminho temporário do arquivo no servidor
        const cdEvento = req.body.cdEvento; // ID do evento associado à imagem

        // Criando um caminho final para a imagem no diretório de destino
        const targetPath = path.join(__dirname, `../uploads/${req.file.originalname}`);

        // Movendo o arquivo temporário para o diretório final
        fs.rename(imagePath, targetPath, async (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erro ao mover o arquivo para o destino.');
            } else {
                // Salvando o caminho da imagem no banco de dados
                const insertionResult = await imageService.inserirImagem({
                    cdEvento,
                    caminhoImagem: targetPath // Caminho final da imagem
                });

                res.send('Upload e inserção no banco de dados realizados com sucesso.');
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
