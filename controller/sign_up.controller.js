const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { readFile, writeFile } = require('../fs/fs_api');

const Sign_up = {
    GET_FORM_SIGN_UP: (req, res) => {
        res.render('actions/auth/sign_up', {
            title: 'Sign up',
            isSignUp: true
        });
    },
    POST: async (req, res) => {
        let newUser = req.body;
        let users = readFile('users.json');

        let salt = await bcrypt.genSalt(10);
        let hashedPsw = await bcrypt.hash(newUser.password, salt);
        newUser.password = hashedPsw;

        let founded = users.find(u => u.email === newUser.email);
        if (founded) {
            return res.send(JSON.stringify({
                msg: "This email is already taken"
            }));
        }

        users.push({ id: uuid.v4(), ...newUser });
        writeFile('users.json', users);
        res.redirect('/sign_in');
    }
};

module.exports = Sign_up;