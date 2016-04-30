import fs from 'fs';

// The location of the saved files.
export const uploadDir = 'uploads';
// Pipe the file to the destination, and log to the terminal.
export default file => {
  const { filename } = file;

  const dest = fs.createWriteStream(`${uploadDir}/${filename}`);
  file.pipe(dest);

  return file;
};
