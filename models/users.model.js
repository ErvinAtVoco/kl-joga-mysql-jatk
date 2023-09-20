//get database connection
const con = require('../utils/db');

const User = function(User){
    this.username = user.username
    this.password = user.password
};

User.registerNew = (newUser, result) => {
    let queryCheckUsername = `SELECT username FROM user
                              WHERE username = '${newUser.username}'`
    let queryAddUser = `INSERT INTO users SET
                 username = '${newUser.username}',
                 password = '${newUser.password}'`
    con.query(queryCheckUsername, (err, res) => {
        if (res.length > 0) {
            console.log('That username is taken')
            result(err, null);
            return;
        } else {
            con.query(queryAddUser, (err, res) => {
                if(err) {
                    console.log('error: ', err);
                    result(err, null);
                    return;
                }
                console.log("Registered new user: ", {id: res.insertId, ...newUser});
                result(null, {id: res.insertId, ...newUser})
            })
        }
    })
};

User.userLogin = (userLogin, result) => {
    let query = `SELECT * FROM users
                 WHERE username = '${userLogin.username}'
                 AND password = '${userLogin.username}'`
    con.query(query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        } else if (res.length > 0) {
            console.log('found user: ', res);
            result(null, res);
        }
    })
}

