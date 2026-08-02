function role(...tiposPermitidos) {

    return function(req, res, next) {


        if (!req.user) {

            return res.status(401).json({
                error: "Usuário não autenticado"
            });

        }


        if (!tiposPermitidos.includes(req.user.tipo)) {

            return res.status(403).json({
                error: "Sem permissão para executar esta ação"
            });

        }


        next();

    };

}


module.exports = role;