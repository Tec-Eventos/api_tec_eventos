const pool = require("../config/database");

const uploadImageUser = async (rm_aluno, imageName ) => {
    console.log('Chamada para uploadImageToDatabase');
    try {
        const data = { rm_aluno, imagem: imageName };
        console.log('Dados a serem inseridos:', data);

        const result = await pool.query('INSERT INTO imagem_perfil_aluno SET ?', data); 
        console.log('Resultado da inserção:', result);

        return result;
    } catch (error) {
        console.error('Erro ao inserir imagem no banco de dados:', error);
        throw error;
    }
};



module.exports = {
    uploadImageUser,
};