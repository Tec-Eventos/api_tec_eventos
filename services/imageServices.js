const pool = require('../config/database');

const inserirImagem = (data) => {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO imagem (cd_evento, imagem)
            VALUES (?, ?)`,
            [
                data.cdEvento,
                data.caminhoImagem // Aqui é passado o caminho final da imagem
            ],
            (error, results, fields) => {
                if (error) {
                    reject(error);
                }
                resolve(results);
            }
        );
    });
};

module.exports = {
    inserirImagem
};
