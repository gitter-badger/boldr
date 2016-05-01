import crypto from 'crypto';
import path from 'path';

const HEX = 'hex';
const SIXTEEN = 16;

export default file => {
  // Create a random basename from 16 bytes in hex.
  const basename = crypto.randomBytes(16).toString('hex');
  // Grab the file extension.
  const extension = path.extname(file.filename);
  // Assign the new filename
  file.filename = `${basename}${extension}`;

  return file;
};
