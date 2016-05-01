import busboy from 'async-busboy';
import _debug from 'debug';
import hash from './lib/hash';
import save, { uploadDir } from './lib/save';
import chalk from 'chalk';

const debug = _debug('boldr:upload:controller');
debug('init');

export async function createUpload(ctx, next) {
  // Get the file-data and fields
  const { files, fields } = await busboy(ctx.req);
  // Save the files and return an array of their filenames
  const filenames = files
    .map(hash) // Generate a random hex filename.
    .map(save) // Pipe the file to a destination.
    // Return the filenames.
    .map(file => `/${uploadDir}/${file.filename}`);

  // Print the name to the console if in prod or dev.
  filenames.forEach(debug(`${chalk.green('SAVING')} to ${chalk.magenta(name)}`));

  ctx.body = {
    filenames
  };
  ctx.status = 200;

  return await next();
}
