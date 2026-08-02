const jwt = require("jsonwebtoken");


function authMiddleware(req, res, next) {

    const authHeader = req.headers.authorization;


    if (!authHeader) {
        return res.status(401).json({
            error: "Token não informado"
        });
    }


    const parts = authHeader.split(" ");


    if (parts.length !== 2) {
        return res.status(401).json({
            error: "Token inválido"
        });
    }


    const token = parts[1];



    try {

        console.log("TOKEN:", token);
        console.log("SECRET:", process.env.JWT_SECRET);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log(decoded);

        req.user = decoded;

        console.log(decoded);


        req.user = decoded;


        next();


    } catch (error) {

        console.log("ERRO JWT:", error.message);

        return res.status(401).json({
            error: error.message
        });

    }



}


module.exports = authMiddleware;