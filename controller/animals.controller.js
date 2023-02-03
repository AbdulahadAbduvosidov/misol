const uuid = require('uuid');
const { readFile, writeFile } = require('../fs/fs_api');
const verify = require('../api/token_verify_api');

const Animals = {
    GET: (req, res) => {
        let signedUser = verify(req);
        let animals = readFile('animals.json').filter(animal => animal.userId == signedUser.id);
        res.render('actions/animals/animals_list', {
            title: 'Animals',
            isAnimalsList: true,
            animals
        });
    },
    GET_FORM_CREATE: (req, res) => {
        res.render('actions/animals/create_animal', {
            title: 'Animals',
            isCreateAnimal: true
        });
    },
    GET_FORM_CREATE_BY: (req, res) => {
        let userId = req.params.userId;
        res.render('actions/animals/create_animal', {
            title: 'Animals',
            isCreateAnimal: true,
            userId
        });
    },
    POST: (req, res) => {
        let signedUser = verify(req);
        let newAnimal = req.body;
        let animals = readFile('animals.json');
        animals.push({ id: uuid.v4(), userId: signedUser.id, ...newAnimal });
        writeFile('animals.json', animals);
        res.redirect('/animals');
    },
    POST_BY: (req, res) => {
        let userId = req.params.userId;
        let newAnimal = req.body;
        let animals = readFile('animals.json');
        animals.push({ id: uuid.v4(), userId: userId, ...newAnimal });
        writeFile('animals.json', animals);
        res.redirect(`/user/${userId}`);
    },
    GET_FORM_UPDATE: (req, res) => {
        let animalId = req.params.id;
        let animals = readFile('animals.json');
        let founded = animals.find(animal => animal.id == animalId)
        res.render('actions/animals/update_animal', {
            title: 'Animals',
            animal: founded
        });
    },
    GET_FORM_UPDATE_BY: (req, res) => {
        let animalId = req.params.id;
        let animals = readFile('animals.json');
        let founded = animals.find(animal => animal.id == animalId)
        res.render('actions/animals/update_animal', {
            title: 'Animals',
            animal: founded,
            userId: req.params.userId
        });
    },
    PUT: (req, res) => {
        let animalId = req.params.id;
        let newAnimal = req.body;
        let animals = readFile('animals.json');
        animals.forEach((animal, index) => {
            if (animal.id === animalId) {
                animal.name = newAnimal.name || animal.name;
                animal.color = newAnimal.color || animal.color;
                animal.country = newAnimal.country || animal.country;
                animal.year = newAnimal.year || animal.year;
            }
        });
        writeFile('animals.json', animals);
        res.redirect('/animals');
    },
    PUT_BY: (req, res) => {
        let animalId = req.params.id;
        let userId = req.params.userId;
        let newAnimal = req.body;
        let animals = readFile('animals.json');
        animals.forEach((animal, index) => {
            if (animal.id === animalId) {
                animal.name = newAnimal.name || animal.name;
                animal.color = newAnimal.color || animal.color;
                animal.country = newAnimal.country || animal.country;
                animal.year = newAnimal.year || animal.year;
            }
        });
        writeFile('animals.json', animals);
        res.redirect(`/user/${userId}`);
    },
    DELETE: (req, res) => {
        let animalId = req.params.id;
        let animals = readFile('animals.json');
        animals.forEach((animal, index) => {
            if (animal.id === animalId) {
                animals.splice(index, 1);
            }
        });
        writeFile('animals.json', animals);
        res.redirect('/animals');
    },
    DELETE_BY: (req, res) => {
        let animalId = req.params.id;
        let userId = req.params.userId;
        let animals = readFile('animals.json');
        animals.forEach((animal, index) => {
            if (animal.id === animalId) {
                animals.splice(index, 1);
            }
        });
        writeFile('animals.json', animals);
        res.redirect(`/user/${userId}`);
    }
};

module.exports = Animals;