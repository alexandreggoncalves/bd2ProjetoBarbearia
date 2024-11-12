const jsonwebtoken = require('jsonwebtoken')

async function usersLoged(req, res, next) {
    // pega os cookies do navegador
    Auth = req.Token || null

    // verifica se o cookie exite 
    if( typeof(Auth) == 'undefined' || Auth == '' || Auth == null ) {
        return res.send({ erro: { login: 'Acesso não autorizado' } })
    } else {
        // tenta reduzir o token
        try {
            // se conseguir autoriza o acesso
            Token = await jsonwebtoken.verify(Auth, 'senhaDoToken')
            next()
        } catch {
            // se não conseguir, bloqueia o acesso
            return res.send({ erro: { login: 'Acesso não autorizado' } })
        }
    }
}

module.exports = usersLoged