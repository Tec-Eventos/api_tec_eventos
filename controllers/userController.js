const { create, getUserById, getUsers, updateUser, deleteUser, getUserByRM  } = require("../services/userServices");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


const MAX_ATTEMPTS = 5;
const loginAttempts = {};

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
        const rm_aluno = req.params.rm_aluno;
        getUserById(rm_aluno, (err, results) => {
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
        const { rm_aluno } = req.params;
        const body = req.body;
        const salt = genSaltSync(10);
        body.senha = hashSync(body.senha, salt);
        body.rm_aluno = rm_aluno;  
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
        const { rm_aluno } = req.params;
        deleteUser({ rm_aluno: rm_aluno }, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results || results.affectedRows === 0) {  // Verificando se algum registro foi afetado
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
        const email = body.email;
        const rm_aluno = body.rm_aluno;

        if (!email || !body.senha || !rm_aluno) {
            return res.status(400).json({
                success: 0,
                message: "Email and password are required"
            });
        }

    
        if (loginAttempts[email] && loginAttempts[email] >= MAX_ATTEMPTS) {
            console.log(`Login attempt for email ${email}. Result: Too many attempts.`);
            return res.status(429).json({
                success: 0,
                message: "Too many failed attempts. Please try again later."
            });
        }
    
        getUserByRM(rm_aluno, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database error"
                });
            }


            // Verificando apenas o e-mail e nome e o rm
            if (email === results.email && body.nome === results.nome && rm_aluno === results.rm_aluno) {
                // Resetando a tentativa de login
                loginAttempts[email] = 0;
                
                // Omitindo a senha no token
                results.senha = undefined;
        
                const jsontoken = sign({ result: results }, process.env.MYSECRET, {
                    expiresIn: "1h"
                });
                
                console.log(`Login attempt for email ${email}. Result: Success using name and email.`);
                
                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken
                });
            } else {
                loginAttempts[email] = (loginAttempts[email] || 0) + 1;
                console.log(`Login attempt for email ${email}. Result: Invalid credentials.`);
                
                return res.json({
                    success: 0,
                    data: "Invalid name or email"
                });
            }
        });
        
    }
    

};