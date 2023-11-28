const imageService = require("../services/imageService");

const uploadImage = async (req, res, next) => {
    try {
        console.log('Chamada para uploadImage');
        const { cd_evento, principal } = req.body;
        const imageName = req.file.filename;

        console.log('Campos recebidos:', { cd_evento, imageName, principal });

        if (!cd_evento || !imageName || !principal) {
            console.error('Erro: Campos faltando na requisição.');
            throw new Error("Missing required data for image upload");
        }

        await imageService.uploadImageToDatabase(cd_evento, imageName, principal);

        console.log('Imagem enviada com sucesso.');
        res.status(200).json({
            message: `Successfully created image with cd_evento: ${cd_evento}`,
        });
    } catch (error) {
        console.error('Erro durante o processo:', error.message);
        next(error);
    }
};


module.exports = {
    uploadImage,
};