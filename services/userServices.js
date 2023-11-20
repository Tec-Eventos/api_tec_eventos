const pool = require("../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `INSERT INTO usersalunos(rm_aluno, nome, email, telefone, cep_aluno, senha, cd_escolar)
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
      `SELECT rm_aluno, nome, email, telefone, cep_aluno, senha, cd_escolar FROM usersalunos`,
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
      `SELECT rm_aluno, nome, email, telefone, cep_aluno, senha, cd_escolar FROM usersalunos WHERE rm_aluno = ?`,
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
      `UPDATE usersalunos SET nome=?, email=?, telefone=?, cep_aluno=?, senha=?, cd_escolar=? WHERE rm_aluno= ?`,
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
      `DELETE FROM usersalunos WHERE rm_aluno = ?`,
      [data.rm_aluno],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results[0]);
      }
    );
  },

  getUserByEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM usersalunos WHERE email = ?`,
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