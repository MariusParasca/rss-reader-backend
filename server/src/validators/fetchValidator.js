import { check } from 'express-validator';

const fetchValidator = [check('id').isUUID()];

export default fetchValidator;
