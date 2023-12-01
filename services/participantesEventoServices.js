const pool = require("../config/database");


module.exports = {
    create: (data, callBack ) => {
        pool.query(
            `INSERT INTO participantes_evento(cd_evento_realizado, rm_aluno_participante)
            VALUES(?, ?)`,
            [
                data.cd_evento_realizado,
                data.rm_aluno_participante
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                } 
                return callBack(null, results);
            }
        );
    }, 
}