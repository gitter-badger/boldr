const response = (ctx, result) => {
  ctx.status = 200;
  ctx.body = {
    success: true,
    ...result
  };
};

response.err = (content, others) => {
  throw {
    type: 'return',
    status: 403,
    content,
    ...others
  };
};

export default response;
