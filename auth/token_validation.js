const { verify } = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            
            verify(token, process.env.MYSECRET, (err, decoded) => {
                if (err) {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    next();
                }
            })
        } else {
            res.status(401).json({
                success: 0,
                message: "Access denied! unautorized user"
            });
        }
    }
}