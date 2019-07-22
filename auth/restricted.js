
const bcrypt = require('bcryptjs');

const Users = require('../users/users-model.js');

function restricted(req, res, next) {
    // read username and password from headers and verify them
    const { username, password } = req.headers;

    if (username && password) {
        Users.findBy({ username })
            .first()
            .then(user => {
                if (user && bcrypt.compareSync(password, user.password)) {
                    next();
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            })
            .catch(error => {
                res.status(500).json(error);
            })
    } else {
        res.status(400).json({ message: "Please provide credentials." });
    }

}

module.exports = restricted;
