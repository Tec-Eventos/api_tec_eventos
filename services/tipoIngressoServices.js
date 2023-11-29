const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        const tipoIngresso = data.tipo_ingresso === 1 ? 'Pago' : 'Gratuito';
        const valor = data.tipo_ingresso === 1 ? data.valor : 0;

        pool.query(
            `INSERT INTO tipo_ingresso(cd_evento, tipo_ingresso, tipo, valor)
            VALUES(?, ?, ?, ?)`,
            [
                data.cd_evento,
                data.tipo_ingresso,
                tipoIngresso,
                valor
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    update: (data, callBack) => {
        const tipoIngresso = data.tipo_ingresso === 1 ? 'Pago' : 'Gratuito';
        const valor = data.tipo_ingresso === 1 ? data.valor : 0;
    
        console.log("Tipo Ingresso:", tipoIngresso);
        console.log("Valor:", valor);
        console.log("cd_evento:", data.cd_evento);
    
        pool.query(
            `UPDATE tipo_ingresso SET tipo = ?, valor=?, tipo_ingresso=? WHERE cd_evento = ?`,
            [tipoIngresso, valor, data.tipo_ingresso, data.cd_evento],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
    

};
