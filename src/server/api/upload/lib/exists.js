import path from 'path';

export default path => {
  return new Promise(resolve => {
    path.exists(path, exists => {
      resolve(exists);
    });
  });
};
