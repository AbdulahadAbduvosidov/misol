const jwt = require('jsonwebtoken')

const verify = (req) => {
    return jwt.verify(req.session.token, process.env.SECRET_KEY);
};

module.exports = verify