const pool = require("../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO aluno(rm_aluno, nome, email, telefone, cep_aluno, senha, cd_escolar)
          VALUES(?,?,?,?,?,?,?)`,
      [
        data.rm_aluno,
        data.nome,
        data.email,
        data.telefone,
        data.cep_aluno,
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

  getUsers: callBack => {  
    pool.query(
      `SELECT rm_aluno, nome, email, telefone, cep_aluno, senha, cd_escolar FROM aluno`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getUserById: (rm_aluno, callBack) => {
    pool.query(
      `SELECT rm_aluno, nome, email, telefone, cep_aluno, senha, cd_escolar FROM aluno WHERE rm_aluno = ?`,
      [rm_aluno],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    )
  },

  updateUser: (data, callBack) => {
    console.log("Data for update:", data);


    pool.query(
      `UPDATE aluno SET nome=?, email=?, telefone=?, cep_aluno=?, senha=?, cd_escolar=? WHERE rm_aluno= ?`,
      [
        data.nome,
        data.email,
        data.telefone,
        data.cep_aluno,
        data.senha,
        data.cd_escolar,
        data.rm_aluno
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  deleteUser: (data, callBack) => {
    console.log("Data for delete:", data);
    pool.query(
      `DELETE FROM aluno WHERE rm_aluno = ?`,
      [data.rm_aluno],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByRM: (rm_aluno, callBack) => {
    pool.query(
      `SELECT * FROM aluno WHERE rm_aluno = ?`,
      [rm_aluno],
      (error, results, fields) => {
        if (error) {
          console.log("DB Error:", error);
          return callBack(error);
        } 
     
        
        console.log("DB Results:", results);
        return callBack(null, results[0]);
      }
    );
  },

  getAllEventsUser: (rm_aluno, callBack) => {
    pool.query(
        `SELECT 
        ev.cd_evento, 
        ev.nome_evento, 
        ev.cd_instituicao, 
        ev.data_evento, 
        ev.horario, 
        ev.quantidade_ingressos, 
        ev.descricao, 
        ev.cep_evento,
        ins.instituicao, 
        ins.tipo_instituicao,
        ie.imagem AS imagem_evento,
        le.imagem AS logo_evento
    FROM 
        presenca_evento pe
        JOIN evento ev ON pe.cd_evento = ev.cd_evento
        JOIN instituicao ins ON ev.cd_instituicao = ins.cd_escolar
        LEFT JOIN imagem_evento ie ON ev.cd_evento = ie.cd_evento AND ie.principal = 1
        LEFT JOIN imagem_evento le ON ev.cd_evento = le.cd_evento AND le.logo_evento = 1
    WHERE 
        pe.rm_aluno = ?`,
    [rm_aluno],
    (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
}


};