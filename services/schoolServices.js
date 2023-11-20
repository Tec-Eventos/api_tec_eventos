

const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
            `INSERT INTO instituicao(cd_escolar, cnpj, instituicao, tipo_instituicao, cep_inst, telefone, email, senha)
            VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                data.cdEscolar,
                data.cnpj,
                data.instituicao,
                data.tipoInstituicao,
                data.cep,
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

    updateSchool: (data, callBack) => {
        console.log("Data for updata:", data);
        pool.query(
            `UPDATE instituicao SET cnpj=?, instituicao=?, tipo_instituicao=?, cep_inst=?, telefone=?, email=?, senha=? WHERE cd_escolar=?`,
            [
                data.cnpj,
                data.instituicao,
                data.tipoInstituicao,
                data.cep,
                data.telefone,
                data.email,
                data.senha,
                data.cdEscolar
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

    getSchoolByEmail: (email, callBack) => {
        pool.query(
            `SELECT * FROM instituicao WHERE email=?`,
            [email],
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