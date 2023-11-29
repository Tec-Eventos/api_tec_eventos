const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO endereco(cep, logradouro, complemento, bairro, cidade, estado)
            VALUES(?, ?, ?, ?, ?, ?)`,
            [
                data.cep,
                data.logradouro,
                data.complemento,
                data.bairro,
                data.cidade,
                data.estado
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                } 
                return callBack(null, results);
            }
        );
    },

    updateEndereco: (data, callBack) => {
        console.log("Data for update:", data);
        pool.query(
            `UPDATE endereco SET logradouro=?, complemento=?, bairro=?, cidade=?, estado=? WHERE cep=?`,
            [
                data.cep,
                data.logradouro,
                data.complemento,
                data.bairro,
                data.cidade,
                data.estado
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                } 
                return callBack(null, results);
            }
        );
    },

    deleteEndereco: (cep, callBack) => {
        pool.query(
            `DELETE FROM endereco WHERE cep = ?`,
            [cep],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                } 
                return callBack(null, results);
            }
        );
    },
    
}