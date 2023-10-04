const bcrypt = require("bcryptjs");

const multipleColumnSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key} = ?`).join(' AND ');

    return {
        columnSet,
        values
    }
}
const multipleParamSet = (object) => {
    if (typeof object !== 'object') {
        throw new Error('Invalid input');
    }

    const keys = Object.keys(object);
    const values = Object.values(object);

    columnSet = keys.map(key => `${key}`).join(', ');

    return {
        keys,
        values
    }
}


// hash password if it exists
const hashPassword = async (req) => {
    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 8);
    }
};

module.exports = {
    multipleColumnSet,
    multipleParamSet,
    hashPassword
}
