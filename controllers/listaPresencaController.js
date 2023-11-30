const {getListaPresenca} = require("../services/listaPresencaServices")


module.exports = {
    getListaPresenca: (req, res) => {
        const cd_evento = req.params.cd_evento;

        getListaPresenca(cd_evento, (err, results) => {
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
