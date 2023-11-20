const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO evento(cd_evento, cd_instituicao, nome_evento, data_evento, horario, quantidade_ingressos, descricao, cep_evento, senha_evento)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.cdEvento,
                data.cd_instituicao,
                data.nomeEvento,
                data.dataEvento,
                data.horario,
                data.qntdIngresso,
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
                data.cd_instituicao,
                data.nomeEvento,
                data.dataEvento,
                data.horario,
                data.qntdIngresso,
                data.descricao,
                data.cep,
                data.senha,
                data.cdEvento,
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
            [data.cdEvento],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
}