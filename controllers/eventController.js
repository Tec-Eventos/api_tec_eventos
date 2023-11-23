const { create, updateEvent, deleteEvent } = require("../services/eventsServices");

module.exports = {
    createEvent: (req, res) => {
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

    updateEvent: (req, res) => {
        const { cd_evento } = req.params;
        const body = req.body;
        body.cd_evento = cd_evento;
        updateEvent(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Failed to update event" //Falha ao atualizar evento
                });
            }
            return res.json({
                success: 1,
                message: "Updated successfully" //Atualizado com sucesso
            });
        });
    },

    deleteEvent: (req, res) => {
        const data = req.body;
        const { cd_evento } = req.params;
        deleteEvent({ cd_evento: cd_evento }, (err, results) => {
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
                message: "Event deleted successfully" //Evento deletado com sucesso
            });
        });
    },
}