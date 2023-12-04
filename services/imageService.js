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

    getImagesForEvent: (cd_evento, callBack) => {
        pool.query(
          ` SELECT 
          cd_evento,
          MAX(CASE WHEN principal = 1 THEN imagem ELSE NULL END) AS imagem_principal,
          MAX(CASE WHEN logo_evento = 1 THEN imagem ELSE NULL END) AS logo_evento,
          GROUP_CONCAT(CASE WHEN principal = 0 AND logo_evento = 0 THEN imagem ELSE NULL END) AS outras_imagens
      FROM imagem_evento
      WHERE cd_evento = ?
      GROUP BY cd_evento`,
          [cd_evento],
          (error, results, fields) => {
            if (error) {
              console.log("DB Error:", error);
              return callBack(error);
            } 
         
            
            console.log("DB Results:", results);
            return callBack(null, results[0]);
          }
        );
      },
};