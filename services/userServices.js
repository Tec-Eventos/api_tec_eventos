const pool = require("../config/database");

module.exports = {
    create: (data, callBack) => {
        pool.query(
          `INSERT INTO usersalunos(nome, email, telefone, instituicao, datanascimento, senha)
          VALUES(?,?,?,?,?,?)`,
          [
            data.nome,
            data.email,
            data.telefone,
            data.instituicao,
            data.datanascimento,
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

    getUsers: callBack => {
      pool.query(
        `SELECT id, nome, email, telefone, instituicao, datanascimento FROM usersalunos`,
        [],
        (error, results, fields) => {
          if(error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    },

    getUserById: (id, callBack) => {
      pool.query(
        `SELECT id, nome, email, telefone, instituicao, datanascimento, senha FROM usersalunos WHERE id = ?`,
        [id],
        (error, results, fields) => {
          if(error) {
            return callBack(error);
          }
          return callBack(null, results[0]);
        }
      )
    },

  updateUser: (data, callBack) => {
    console.log("Data for update:", data);
      pool.query(
        `UPDATE usersalunos SET nome=?, email=?, telefone=?, instituicao=?, datanascimento=?, senha=? WHERE id= ?`,
        [
          data.nome,
          data.email,
          data.telefone,
          data.instituicao,
          data.datanascimento,
          data.senha,
          data.id
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
        `DELETE FROM usersalunos WHERE id = ?`,
        [data.id],
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