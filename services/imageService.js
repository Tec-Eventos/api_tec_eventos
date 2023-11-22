const pool = require("../config/database");

const uploadImageToDatabase = async (cd_evento, imageName) => {
    const data = { cd_evento, imagem: imageName };
    const result = await pool.query('INSERT INTO imagem SET ?', data);
    return result;
};

module.exports = {
    uploadImageToDatabase,
};
