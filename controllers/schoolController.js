

const { create, getSchoolById, getSchools, updateSchool, deleteSchool, getSchoolByEmail } = require("../services/schoolServices");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { log } = require("npmlog");

const MAX_ATTEMPTS = 5;
const loginAttempts = {};

module.exports = {
    createSchool: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.senha = hashSync(body.senha, salt);
        create(body, (err, results) => {
            if (err) {
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

    getSchoolById: (req, res) => {
        const idEscolar = req.params.idEscolar;
        getSchoolById(idEscolar, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Record not found" //Registro não encontrado
                });
            }

            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    getSchools: (req, res) => {
        getSchools((err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },

    updateSchool: (req, res) => {
        const { idEscolar } = req.params;
        const body = req.body;
        const salt = genSaltSync(10);
        body.senha = hashSync(body.senha, salt);
        body.idEscolar = idEscolar;
        updateSchool(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.status(400).json({
                    success: 0,
                    message: "Failed to update" //Falha ao atualizar esocola
                });
            }
            return res.status(200).json({
                success: 1,
                message: "School update succesfully" //Atualizado com sucesso
            });
        });
    },

    deleteSchool: (req, res) => {
        const data = req.body;
        const { idEscolar } = req.params;
        deleteSchool({ idEscolar: idEscolar }, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results || results.affectedRows === 0) {  // Verificando se algum registro foi afetado
                return res.status(400).json({
                    success: 0,
                    message: "Record not found" //Registro não encontrado
                });
            }
            return res.status(200).json({
                success: 1,
                message: "User deleted successfully" //Usuário deletado com sucesso  
            });
        });
    },

    login: (req, res) => {
        const body = req.body;
        const email = body.email;

        if (!email || !body.senha) {
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

        getUserByEmail(email, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database error"
                });
            }

            // Verificando apenas o e-mail e nome
            if (results && body.nome === results.nome) {
                // Resetando a tentativa de login
                loginAttempts[email] = 0;

                // Omitindo a senha no token
                results.senha = undefined;

                const jsontoken = sign({ result: results }, process.env.MYSECRET, {
                    expiresIn: "1h"
                });

                console.log(`Login attempt for email ${email}. Result: Success using name and email.`);

                return res.status(200).json({
                    success: 1,
                    message: "Login successfully",
                    token: jsontoken
                });
            } else {
                loginAttempts[email] = (loginAttempts[email] || 0) + 1;
                console.log(`Login attempt for email ${email}. Result: Invalid credentials.`);

                return res.status(400).json({
                    success: 0,
                    data: "Invalid name or email"
                });
            }
        });
    }
};
