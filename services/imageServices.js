const pool = require('../config/database');

const inserirImagem = (data) => {
    return new Promise((resolve, reject) => {
        if (!data || !data.cdEvento || !data.caminhoImagem) {
            return reject('Dados inválidos para inserção de imagem no banco de dados.');
        }

        pool.query(
            `INSERT INTO imagem (cd_evento, imagem)
            VALUES (?, ?)`,
            [data.cdEvento, '../uploads/'],
            (error, results, fields) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            }
        );
    });
};

module.exports = {
    inserirImagem
};
