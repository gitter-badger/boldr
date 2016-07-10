import crypto from 'crypto';

/**
 * Creates random bytes with crypto using hex to avoid / signs.
 * @return {Promise<string, void>} Returns a promise about the created string.
 */
function pCryptoRandomBytes() {
  return new Promise((resolve) => {
    crypto.randomBytes(45, (ex, buf) => {
      const salt = buf.toString('hex');
      return resolve(salt);
    });
  });
}

/**
 * Creates a hashed secret.
 * @param  {string} secret Secret which should be hashed with salt
 * @param  {string} salt   Created randombytes
 * @return {Promise<string,Error>}  Returns a promise about the hashed key.
 */
function pCryptoPbkdf2(secret, salt) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(secret, salt, 4096, 1024, 'sha256', (err, key) => {
      if (err) {
        return reject(err);
      }
      return resolve(key.toString('hex'));
    });
  });
}

/**
 * Generates a salt and hash from the password.
 * @param  {string} password User's password
 * @return {Promise<Object,void>}  Returns a promise about
 * the generated salt and hash which is an object.
 */
export async function generateSaltAndHash(password) {
  const salt = await pCryptoRandomBytes();
  const hashCode = await pCryptoPbkdf2(password, salt);
  return { salt, hashCode };
}

/**
 * Verifies the given password for a user
 * @param  {Object} user     Sequelize user object
 * @param  {string} password Given password which should be verified
 * @return {Promise<Boolean,void>}  Returns a promise which resolves a boolean.
 */
export async function verifyPassword(user, password) {
  if (!user || !user.salt) {
    throw new Error('No user or salt provided to verifyPassword function.');
  }
  const hashCode = await pCryptoPbkdf2(password, user.salt);
  return hashCode === user.passwordHash;
}

export function processQuery(req, res, next) {
  function getPagination(page) {
    page = page ? page : {};
    return {
      number: page.number || 0,
      size: page.size || 10
    };
  }
  function getOrder(sort) {
    const sortObj = {};
    if (sort) {
      sortObj.by = sort.startsWith('-') ? sort.slice(1) : sort;
      sortObj.order = sort.startsWith('-') ? 'desc' : 'asc';
    } else {
      // default
      sortObj.order = 'id';
      sortObj.order = 'desc';
    }
    return sortObj;
  }
  req.query.page = getPagination(req.query.page);
  req.query.sort = getOrder(req.query.sort);
  next();
}
