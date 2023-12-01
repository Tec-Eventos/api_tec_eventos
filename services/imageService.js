const pool = require("../config/database");

const uploadImageToDatabase = async (cd_evento, imageName, principal, logo_evento) => {
    console.log('Chamada para uploadImageToDatabase');
    try {
        const data = { cd_evento, imagem: imageName, principal, logo_evento };
        console.log('Dados a serem inseridos:', data);

        const result = await pool.query('INSERT INTO imagem_evento SET ?', data); 
        console.log('Resultado da inserção:', result);

        return result;
    } catch (error) {
        console.error('Erro ao inserir imagem no banco de dados:', error);
        throw error;
    }
};


module.exports = {
    uploadImageToDatabase,
};