const pool = require("../config/database");


module.exports = {
    getListaPresenca: (cd_evento, callBack) => {
        selectSQL = `SELECT presenca_evento.cd_evento, aluno.nome, aluno.rm_aluno
        FROM ((presenca_evento
        INNER JOIN evento ON presenca_evento.cd_evento = evento.cd_evento)
        INNER JOIN aluno ON presenca_evento.rm_aluno = aluno.rm_aluno)
        WHERE presenca_evento.cd_evento = ?`

        pool.query(selectSQL, [cd_evento], (error, result, fields) => {
            if(error){
                return callBack(error);
            }
            return  callBack(null, result);
        })
    }
}