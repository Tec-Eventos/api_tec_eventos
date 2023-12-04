const {create, getQRCodeValidator, selectQrCodeAluno} = require("../services/qrcodeServices")
const { sign } = require("jsonwebtoken");

module.exports = {
    createQRCode: (req, res) => {
        const body = req.body;
        
        create(body, (err, results) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Erro relacionado ao Banco de Dados"
                })
            } 

            return res.status(200).json({
                success: 1,
                data: results
            })

        

            
        });
    },


    getQRCodeValidator: (req, res) => {
        const cd_evento = req.params.cd_evento;
        const rm_aluno = req.params.rm_aluno;

        getQRCodeValidator(cd_evento, rm_aluno, (err, results) => {
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    },

    selectQrCodeAluno: (req, res) =>{
        const cd_evento = req.params.cd_evento;
        const rm_aluno = req.params.rm_aluno;

        selectQrCodeAluno( cd_evento, rm_aluno, (err, results) => {

            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }

            return res.json({
                success: 1,
                data: results
            })
        })
    }

}
