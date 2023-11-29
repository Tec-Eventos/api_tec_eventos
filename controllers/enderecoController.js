const { create, updateEndereco, deleteEndereco } = require("../services/enderecoServices");

module.exports = {
    createEndereco: (req, res) => {
        const body = req.body;
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

    updateEndereco: (req, res) => {
        const { cep } = req.params;
        const body = req.body;
        body.cep = cep;  
        updateEndereco(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update cep" //Falha ao atualizar endereço
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully" //Atualizado com sucesso
            });
        });
    },

    deleteEndereco: (req, res) => {
        const { cep } = req.params;
        deleteEndereco(cep, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            if (!results || results.affectedRows === 0) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                });
            }
            return res.json({
                success: 1,
                message: "Cep deleted successfully"
            });
        });
    },
    

}