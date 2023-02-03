const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readFile, writeFile } = require('../fs/fs_api');

const Sign_in = {
    GET_FORM_SIGN_IN: (req, res) => {
        res.render('actions/auth/sign_in', {
            title: 'Sign in',
            isSignIn: true
        });
    },
    POST: async (req, res) => {
        let signInUser = req.body;
        let users = readFile('users.json');
        let founded = users.find(u => u.email === signInUser.email);
        if (!founded) {
            return res.send(JSON.stringify({
                msg: "This email is not registered"
            }));
        }
        let result = await bcrypt.compare(signInUser.password, founded.password);
        if (!result) {
            return res.send(JSON.stringify({
                msg: "Password is wrong"
            }));
        }

        let token = jwt.sign({ id: founded.id, email: founded.email }, process.env.SECRET_KEY, { expiresIn: '2h' });
        if(founded.role === 'admin'){
            req.session.isAdmin = true;
        } else if (founded.role === 'admin'){
            req.session.isAdmin = false;
        }
        req.session.isSignedIn = true;
        req.session.token = token;

        res.redirect('/cars');
    }
};

module.exports = Sign_in;