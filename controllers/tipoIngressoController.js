const { create, update } = require("../services/tipoIngressoServices");

module.exports = {
    createTipoIngresso: (req, res) => {
        const body = req.body;
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
                message: "Tipo Ingresso created successfully",
                data: results
            });
        });
    },

    updateTipoIngresso: (req, res) => {

        const body = req.body;
        update(body, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                message: "Tipo de ingresso atualizado com sucesso"
            });
        });
    }
};
