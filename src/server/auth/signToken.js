import jwt from 'jsonwebtoken';
import Promise from 'bluebird';
Promise.promisifyAll(jwt);

const EXPIRATION_AGE = 604800000; // 7 days

function getExpirationDate() {
  return new Date(Number(new Date()) + EXPIRATION_AGE);
}

export async function signJwt(payload, options) {
  return await jwt.signAsync(payload, process.env.JWT_SECRET, options);
}
