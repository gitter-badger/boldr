import User from '../../db/models/user';
import config, { paths } from '../../../../tools/config';
import { returnCode, response } from '../../utils';

export async function getUsers(ctx) {
  const users = await User.fetchAll();
  ctx.body = {
    users
  };
}

export async function getUserById(ctx, next) {
  try {
    const user = await User.where('id', ctx.params.id).fetch({
      columns: ['display_name', 'username', 'id', 'avatar', 'email']
    });
    if (!user) {
      console.log('error');
    }

    ctx.body = {
      user
    };
  } catch (err) {
    if (err === 404 || err.name === 'CastError') {
      console.log('error');
    }

    console.log('error');
  }
}
