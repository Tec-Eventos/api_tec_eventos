const imageService = require("../services/imageService");

const uploadImage = async (req, res, next) => {
    try {
        const { cd_evento } = req.body;
        const imageName = req.file.filename;

        if (!cd_evento || !imageName) {
            throw new Error("Missing required data for image upload");
        }

        await imageService.uploadImageToDatabase(cd_evento, imageName);

        res.status(200).json({
            message: `Successfully created image with cd_evento: ${cd_evento}`,
        });
    } catch (error) {
        next(error); // Envia o erro para o middleware de tratamento de erros
    }
};

module.exports = {
    uploadImage,
};
