const { create, getUserById, getUsers, updateUser, deleteUser, getUserByEmail } = require("../services/userServices");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.senha = hashSync(body.senha, salt);
        create(body, (err, results) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getUserById: (req, res) => {
        const id = req.params.id;
        getUserById(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found" //Registro não encontrado
                });
            }

            return res.json({
                success: 1,
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },

    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.senha = hashSync(body.senha, salt);
        updateUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update user" //Falha ao atualizar usuário
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully" //Atualizado com sucesso
            });
        });
    },

    deleteUser: (req, res) => {
        const data = req.body;
        deleteUser(data, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "User deleted successfully" //Usuario deletado com sucesso
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid email or password" //Email ou senha inválidos
                });
            }
            const result = compareSync(body.senha, results.senha);
            if (result) {
                results.senha = undefined;
                const jsontoken = sign({ result: results }, "qwe1234", {
                    expiresIn: "1h"
                });

                return res.json({
                  success: 1,
                  message: "Login successfully", //Login feito com sucesso  
                  token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    data: "Invalid email or password" //Email ou senha inválidos
                });
            }
        });
    }

};