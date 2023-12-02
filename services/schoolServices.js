
const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO instituicao(cd_escolar, cnpj, instituicao, tipo_instituicao, cep_inst, telefone, email, senha) 
            VALUES (?,?,?,?,?,?,?,?)`,
            [
                data.cd_escolar,
                data.cnpj,
                data.instituicao,
                data.tipo_instituicao,
                data.cep_inst,
                data.telefone,
                data.email,
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

    getSchools: callBack => {
        pool.query(
            `SELECT cd_escolar, cnpj, instituicao, tipo_instituicao, cep_inst, telefone, email, senha FROM instituicao`,
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    getSchoolById: (cdEscolar, callBack) => {
        pool.query(
            `SELECT cd_escolar, cnpj, instituicao, tipo_instituicao, cep_inst, telefone, email, senha FROM instituicao WHERE cd_escolar = ?`,
            [cdEscolar],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getAllEventsSchoolDo: (cdEscolar, callBack) => {
        pool.query(
            `SELECT e.cd_evento, e.nome_evento, e.data_evento, e.horario, e.quantidade_ingressos, e.descricao, e.cep_evento,
            CASE WHEN ie.principal = 1 THEN ie.imagem ELSE NULL END AS imagem
        FROM evento e
        LEFT JOIN imagem_evento ie ON e.cd_evento = ie.cd_evento
        WHERE e.cd_instituicao = ?`,
        [cdEscolar],
        (error, results, fields) => {
            if (error) {
              return callBack(error);
            }
            return callBack(null, results);
          }
        );
    },

    updateSchool: (data, callBack) => {
        console.log("Data for updata:", data);
        pool.query(
            `UPDATE instituicao SET cnpj=?, instituicao=?, tipo_instituicao=?, cep_inst=?, telefone=?, email=?, senha=? WHERE cd_escolar=?`,
            [
                data.cnpj,
                data.instituicao,
                data.tipo_instituicao,
                data.cep_inst,
                data.telefone,
                data.email,
                data.senha,
                data.cd_escolar
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    deleteSchool: (data, callBack) => {
        console.log("Data for delete:", data);
        pool.query(
            `DELETE FROM instituicao WHERE cd_escolar=?`,
            [data.cdEscolar],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },

    getSchoolByCdEscolar: (cd_escolar, callBack) => {
        pool.query(
            `SELECT * FROM instituicao WHERE cd_escolar = ?`,
            [cd_escolar],
            (error, results, fields) => {
                if (error) {
                    console.log("DB Error:", error);
                    return callBack(error);
                }
                console.log("DB Results:", results);
                return callBack(null, results[0]);
            }
        );
    }

};