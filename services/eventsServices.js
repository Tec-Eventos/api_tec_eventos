const pool = require("../config/database");


module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO evento(cd_evento, cd_instituicao, nome_evento, data_evento, horario, quantidade_ingressos, descricao, cep_evento, senha_evento)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.cd_evento,
                data.cd_instituicao,
                data.nome_evento,
                data.data_evento,
                data.horario,
                data.quantidade_ingressos,
                data.descricao,
                data.cep,
                data.senha
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    updateEvent: (data, callBack) => {
        console.log("Data for update:", data);
        pool.query(
            `UPDATE evento SET cd_instituicao=?, nome_evento=?, data_evento=?, horario=?, quantidade_ingressos=?, descricao=?, cep_evento=?, senha_evento=? WHERE cd_evento= ?`,
            [
                data.cd_evento,
                data.cd_instituicao,
                data.nome_evento,
                data.data_evento,
                data.horario,
                data.quantidade_ingressos,
                data.descricao,
                data.cep,
                data.senha
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteEvent: (data, callBack) => {
        console.log("Data for delete:", data);
        pool.query(
            `DELETE FROM evento WHERE cd_evento = ?`,
            [data.cd_evento],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
}