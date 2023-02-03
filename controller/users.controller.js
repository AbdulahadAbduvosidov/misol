const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const { readFile, writeFile } = require('../fs/fs_api');
const verify = require('../api/token_verify_api');

const Users = {
    GET: (req, res) => {
        let signedUser = verify(req);
        let users = readFile('users.json').filter(user => user.id != signedUser.id);
        res.render('actions/users/users_list', {
            title: 'Users',
            isAdminActive: true,
            users
        });
    },
    GET_USER: (req, res) => {
        let userId = req.params.id;
        let user = readFile('users.json').find(u => u.id === userId);
        let cars = readFile('cars.json').filter(car => car.userId === userId);
        let animals = readFile('animals.json').filter(animal => animal.userId === userId);
        let fruits = readFile('fruits.json').filter(fruit => fruit.userId === userId);
        res.render('actions/users/info_user', {
            title: 'User',
            isAdminActive: true,
            user,
            cars,
            animals,
            fruits
        });
    },
    GET_FORM_CREATE: (req, res) => {
        res.render('actions/users/create_user', {
            title: 'Users',
            isCreateUser: true
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
        res.redirect('/users');
    },
    GET_FORM_UPDATE: (req, res) => {
        let userId = req.params.id;
        let users = readFile('users.json');
        let founded = users.find(user => user.id == userId)
        res.render('actions/users/update_user', {
            title: 'Users',
            user: founded
        });
    },
    PUT: async (req, res) => {
        let userId = req.params.id;
        let newUser = req.body;
        let users = readFile('users.json');

        if(newUser.password){
            let salt = await bcrypt.genSalt(10);
            let hashedPsw = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashedPsw;
        }

        let founded = users.find(u => u.email === newUser.email);
        if (founded) {
            if (founded.id !== userId){
                return res.send(JSON.stringify({
                    msg: "This email is already taken"
                }));
            }
        }
                
        users.forEach((user, index) => {
            if (user.id === userId) {
                user.username = newUser.username || user.username;
                user.role = newUser.role || user.role;
                user.email = newUser.email || user.email;
                user.password = newUser.password || user.password;
            }
        });
        writeFile('users.json', users);
        res.redirect('/users');
    },
    DELETE: (req, res) => {
        let userId = req.params.id;
        let users = readFile('users.json');
        users.forEach((user, index) => {
            if (user.id === userId) {
                users.splice(index, 1);
            }
        });
        writeFile('users.json', users);
        res.redirect('/users');
    }
};

module.exports = Users;