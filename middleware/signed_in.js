module.exports = (req, res, next) => {
    res.locals.isSignedIn = req.session.isSignedIn;
    next();
};