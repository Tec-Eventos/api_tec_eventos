const pool = require("../config/database");


module.exports = {
    create: (data, callBack) => {
        insertSQL = `INSERT INTO qrcode_evento(cd_evento, valor_qr) VALUES(?, ?)`
        
        pool.query(insertSQL, [data.cd_evento, data.valor_qr], (error, results, fields) => {
            if(error){
                return callBack(error);
            }

            return callBack(null, results);
        }
      );
    },

    getQRCodeValidator: (cd_evento, rm_aluno, callBack) => {
        selectSQL = `SELECT presenca_evento.cd_evento, evento.cd_evento, evento.nome_evento, aluno.nome, aluno.rm_aluno, qrcode_evento.valor_qr
        FROM (((presenca_evento
        INNER JOIN evento ON presenca_evento.cd_evento = evento.cd_evento)
        INNER JOIN aluno ON presenca_evento.rm_aluno = aluno.rm_aluno)
        INNER JOIN qrcode_evento ON presenca_evento.cd_evento = qrcode_evento.cd_evento) 
        WHERE presenca_evento.cd_evento = ? AND presenca_evento.rm_aluno = ?;`

        pool.query(selectSQL, [cd_evento, rm_aluno], (error, result, fields) => {
            if(error){
                return callBack(error);
            }
            return  callBack(null, result[0]);
        })
    }
}