const { check } = require('express-validator');

exports.fetchValidator = [check('id').isUUID()];
