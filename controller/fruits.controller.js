const uuid = require('uuid');
const { readFile, writeFile } = require('../fs/fs_api');
const verify = require('../api/token_verify_api');

const Fruits = {
    GET: (req, res) => {
        let signedUser = verify(req);
        let fruits = readFile('fruits.json').filter(fruit => fruit.userId == signedUser.id);
        res.render('actions/fruits/fruits_list', {
            title: 'Fruits',
            isFruitsList: true,
            fruits
        });
    },
    GET_FORM_CREATE: (req, res) => {
        res.render('actions/fruits/create_fruit', {
            title: 'Fruits',
            isCreateFruit: true
        });
    },
    GET_FORM_CREATE_BY: (req, res) => {
        let userId = req.params.userId;
        res.render('actions/fruits/create_fruit', {
            title: 'Fruits',
            isCreateFruit: true,
            userId
        });
    },
    POST: (req, res) => {
        let signedUser = verify(req);
        let newFruit = req.body;
        let fruits = readFile('fruits.json');
        fruits.push({ id: uuid.v4(), userId: signedUser.id, ...newFruit });
        writeFile('fruits.json', fruits);
        res.redirect('/fruits');
    },
    POST_BY: (req, res) => {
        let userId = req.params.userId;
        let newFruit = req.body;
        let fruits = readFile('fruits.json');
        fruits.push({ id: uuid.v4(), userId: userId, ...newFruit });
        writeFile('fruits.json', fruits);
        res.redirect(`/user/${userId}`);
    },
    GET_FORM_UPDATE: (req, res) => {
        let fruitId = req.params.id;
        let fruits = readFile('fruits.json');
        let founded = fruits.find(fruit => fruit.id == fruitId)
        res.render('actions/fruits/update_fruit', {
            title: 'Fruits',
            fruit: founded
        });
    },
    GET_FORM_UPDATE_BY: (req, res) => {
        let fruitId = req.params.id;
        let fruits = readFile('fruits.json');
        let founded = fruits.find(fruit => fruit.id == fruitId)
        res.render('actions/fruits/update_fruit', {
            title: 'Fruits',
            fruit: founded,
            userId: req.params.userId
        });
    },
    PUT: (req, res) => {
        let fruitId = req.params.id;
        let newFruit = req.body;
        let fruits = readFile('fruits.json');
        fruits.forEach((fruit, index) => {
            if (fruit.id === fruitId) {
                fruit.name = newFruit.name || fruit.name;
                fruit.color = newFruit.color || fruit.color;
                fruit.country = newFruit.country || fruit.country;
                fruit.price = newFruit.price || fruit.price;
            }
        });
        writeFile('fruits.json', fruits);
        res.redirect('/fruits');
    },
    PUT_BY: (req, res) => {
        let fruitId = req.params.id;
        let userId = req.params.userId;
        let newFruit = req.body;
        let fruits = readFile('fruits.json');
        fruits.forEach((fruit, index) => {
            if (fruit.id === fruitId) {
                fruit.name = newFruit.name || fruit.name;
                fruit.color = newFruit.color || fruit.color;
                fruit.country = newFruit.country || fruit.country;
                fruit.price = newFruit.price || fruit.price;
            }
        });
        writeFile('fruits.json', fruits);
        res.redirect(`/user/${userId}`);
    },
    DELETE: (req, res) => {
        let fruitId = req.params.id;
        let fruits = readFile('fruits.json');
        fruits.forEach((fruit, index) => {
            if (fruit.id === fruitId) {
                fruits.splice(index, 1);
            }
        });
        writeFile('fruits.json', fruits);
        res.redirect('/fruits');
    },
    DELETE_BY: (req, res) => {
        let fruitId = req.params.id;
        let userId = req.params.userId;
        let fruits = readFile('fruits.json');
        fruits.forEach((fruit, index) => {
            if (fruit.id === fruitId) {
                fruits.splice(index, 1);
            }
        });
        writeFile('fruits.json', fruits);
        res.redirect(`/user/${userId}`);
    }
};

module.exports = Fruits;