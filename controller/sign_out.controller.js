const Sign_out = {
    GET: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/sign_in')
        });
    }
};

module.exports = Sign_out;