const express = require('express')
const fs = require('fs')
const app = express()
const ObjectsToCsv = require('objects-to-csv')

const neatCsv = require('neat-csv');

app.listen(8080, () => {
    console.log('Server is listing on port 8080..')
    readUsersFromDB();
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/checkCredentials', function (req, res) {
    let user = req.query;
    let isUserExist = usersList
        .find(userDB => ((user.username == userDB.Username) && (user.password == decryptionPassword(userDB.Password))));
    if (isUserExist) {
        res.send({
            isAuthorized: true,
            data: isUserExist,
        })
    } else {
        res.send({
            isAuthorized: false,
            data: '',
            error: 'Username or Password is incorrect, try again.'
        })
    }
})

app.get('/users', (req, res) => {
    let userListWithNoPsswords = usersList.map(user => ({ ...user })).filter(r => delete r.Password);
    res.send(userListWithNoPsswords)
})

app.get('/user', (req, res) => res.send(usersList.filter(user => req.query.Id == user.Id)))

var usersList = [];
function readUsersFromDB() {
    fs.readFile('./users.csv', async (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        let users = await neatCsv(data);
        usersList = users
    })
}

function decryptionPassword(b64EncodedPassword) {
    var decodedString = Buffer.from(b64EncodedPassword, 'base64').toString();
    return decodedString;
}

function encyptionPassword(password) {
    var encodedString = Buffer.from('12345').toString('base64');
    console.log(encodedString);
    return encodedString;
}
