module.exports = (req, res, next) => {
    if(!req.session.isSignedIn){
        res.redirect('/sign_in');
    }
    next();
};