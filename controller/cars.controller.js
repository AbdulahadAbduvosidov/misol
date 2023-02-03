const uuid = require('uuid');
const { readFile, writeFile } = require('../fs/fs_api');
const verify = require('../api/token_verify_api');

const Cars = {
    GET: (req, res) => {
        let signedUser = verify(req);
        let cars = readFile('cars.json').filter(car => car.userId == signedUser.id);
        res.render('actions/cars/cars_list', {
            title: 'Cars',
            isCarsList: true,
            cars
        });
    },
    GET_FORM_CREATE: (req, res) => {
        res.render('actions/cars/create_car', {
            title: 'Cars',
            isCreateCar: true
        });
    },
    GET_FORM_CREATE_BY: (req, res) => {
        let userId = req.params.userId;
        res.render('actions/cars/create_car', {
            title: 'Cars',
            isCreateCar: true,
            userId
        });
    },
    POST: (req, res) => {
        let signedUser = verify(req);
        let newCar = req.body;
        let cars = readFile('cars.json');
        cars.push({ id: uuid.v4(), userId: signedUser.id, ...newCar });
        writeFile('cars.json', cars);
        res.redirect('/cars');
    },
    POST_BY: (req, res) => {
        let userId = req.params.userId;
        let newCar = req.body;
        let cars = readFile('cars.json');
        cars.push({ id: uuid.v4(), userId: userId, ...newCar });
        writeFile('cars.json', cars);
        res.redirect(`/user/${userId}`);
    },
    GET_FORM_UPDATE: (req, res) => {
        let carId = req.params.id;
        let cars = readFile('cars.json');
        let founded = cars.find(car => car.id == carId)
        res.render('actions/cars/update_car', {
            title: 'Cars',
            car: founded
        });
    },
    GET_FORM_UPDATE_BY: (req, res) => {
        let carId = req.params.id;
        let cars = readFile('cars.json');
        let founded = cars.find(car => car.id == carId)
        res.render('actions/cars/update_car', {
            title: 'Cars',
            car: founded,
            userId: req.params.userId
        });
    },
    PUT: (req, res) => {
        let carId = req.params.id;
        let newCar = req.body;
        let cars = readFile('cars.json');
        cars.forEach((car, index) => {
            if (car.id === carId) {
                car.model = newCar.model || car.model;
                car.brand = newCar.brand || car.brand;
                car.color = newCar.color || car.color;
                car.price = newCar.price || car.price;
                car.year = newCar.year || car.year;
            }
        });
        writeFile('cars.json', cars);
        res.redirect('/cars');
    },
    PUT_BY: (req, res) => {
        let carId = req.params.id;
        let userId = req.params.userId;
        let newCar = req.body;
        let cars = readFile('cars.json');
        cars.forEach((car, index) => {
            if (car.id === carId) {
                car.model = newCar.model || car.model;
                car.brand = newCar.brand || car.brand;
                car.color = newCar.color || car.color;
                car.price = newCar.price || car.price;
                car.year = newCar.year || car.year;
            }
        });
        writeFile('cars.json', cars);
        res.redirect(`/user/${userId}`);
    },
    DELETE: (req, res) => {
        let carId = req.params.id;
        let cars = readFile('cars.json');
        cars.forEach((car, index) => {
            if (car.id === carId) {
                cars.splice(index, 1);
            }
        });
        writeFile('cars.json', cars);
        res.redirect('/cars');
    },
    DELETE_BY: (req, res) => {
        let carId = req.params.id;
        let userId = req.params.userId;
        let cars = readFile('cars.json');
        cars.forEach((car, index) => {
            if (car.id === carId) {
                cars.splice(index, 1);
            }
        });
        writeFile('cars.json', cars);
        res.redirect(`/user/${userId}`);
    }
};

module.exports = Cars;