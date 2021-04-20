const { v4:uuidv4 } = require("uuid")
const express = require("express");

const app = express();

app.use(express.json());

const users = [];

app.post('/user', (request, response) => {
    const { name, cpf, email, phone } = request.body;

    const userExists = users.some(
        (user) => user.cpf === cpf
    );

    if (userExists) {
        return response.status(400).json({ error: "User already exists!" })
    }

    users.push({
        id: uuidv4(),
        name,
        cpf,
        email,
        phone
    });

    return response.status(201).send();
});

app.get('/users', (req, res) => {

    return res.status(200).json(users);
});

app.get('/users/:cpf', (req, res) => {

    const { cpf } = req.params;
    const user = users.find((user) => user.cpf === cpf);

    if (user) {
        return res.status(200).json(user);
    } else {
        return res.status(400).json({ error: 'User not found' });
    }
});

app.put('/users/:cpf', (req, res) => {

    const { cpf } = req.params;
    const { name, email, phone } = req.body;
    const user = users.find((user) => user.cpf == cpf);

    if (!user) {
        return res.status(400).json({ error: 'User not exist' })
    } else {
        user.name = name;
        user.cpf = cpf;
        user.email = email;
        user.phone = phone;

        return res.status(200).json(user);
    }

});

app.delete('/users/:cpf', (req, res) => {
    const { cpf } = req.params;

    const validateCpf = users.some((user) => (user.cpf === cpf));

    if (validateCpf) {
        users.splice(users.indexOf(cpf), 1);
        return res.status(200).json(users);
    } else {
        return res.status(400).json({ error:'Error to delete user' })
    }
});



app.listen(3333);