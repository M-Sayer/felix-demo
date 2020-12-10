import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config.js';

const { sign, verify } = jwt

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;
const REGEX_UPPER_LOWER_NUMBER_DASH_HYPHEN = /(?=.*[!@#\$%\^&])[\S]+/;

export const UsersService = {
  createJwt(subject, payload) {
    return sign(payload, JWT_SECRET, {
      subject,
      algorithm: 'HS256',
    });
  },
  verifyJwt(token) {
    return verify(token, JWT_SECRET, {
      algorithms: ['HS256'],
    });
  },

  getUserWithEmail(db, email) {
    return db('users')
      .where({ email })
      .first()
      .catch((error) => error);
  },

  getUserWithId(db, id) {
    return db('users')
      .where({ id })
      .first()
      .catch((error) => error);
  },

  createUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user);
  },

  unhashPassword(password, hash) {
    return compare(password, hash);
  },
};