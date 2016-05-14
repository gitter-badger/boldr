const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncValidate = (values/*, dispatch */) => {// eslint-disable-line
  return sleep(1000) // simulate server latency
    .then(() => {
      if (['foo@foo.com', 'bar@bar.com'].includes(values.email)) {
        throw { email: 'Email already Exists' }// eslint-disable-line
      }
    });
};

export default asyncValidate;
