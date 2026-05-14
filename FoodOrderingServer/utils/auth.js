const jwt = require('jsonwebtoken')

const config = require('./config')
const createResult = require('./result')

function authUser(req, res, next) {
    if (req.url == '/user/signup' || req.url == '/user/signin' || req.url == '/food/menu')
        next()
    else {
        const bearer_token = req.headers.authorization
        if (bearer_token) {
            const token = bearer_token.split(' ')[1]
            try {
                const payload = jwt.verify(token, config.SECRET)
                req.headers.uid = payload.uid
                next()
            } catch (error) {
                res.send(createResult(null, 'Token is invalid'))
            }
        } else
            res.send(createResult(null, 'Token is Missing'))
    }
}
module.exports = authUser