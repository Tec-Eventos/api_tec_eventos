const imageUserService = require("../services/imageUserServices");

const uploadImage = async (req, res, next) => {
    try {
        console.log('Chamada para uploadImage');
        const { rm_aluno } = req.body;
        const imageName = req.file.filename;

        console.log('Campos recebidos:', { rm_aluno, imageName });

        if (!rm_aluno || !imageName ) {
            console.error('Erro: Campos faltando na requisição.');
            throw new Error("Missing required data for image upload");
        }

        await imageUserService.uploadImageUser(rm_aluno, imageName );

        console.log('Imagem enviada com sucesso.');
        res.status(200).json({
            message: `Successfully created image with rm_aluno: ${rm_aluno}`,
        });
    } catch (error) {
        console.error('Erro durante o processo:', error.message);
        next(error);
    }
};


module.exports = {
    uploadImage,
};