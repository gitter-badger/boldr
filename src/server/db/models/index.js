/**
 * boldr/server/db/models
 * Definition of secondary indexes and relationships.
 *
 * @exports {Object} - Article model
 * @exports {Object} - Collection model
 * @exports {Object} - Group model
 * @exports {Object} - Page model
 * @exports {Object} - Setting model
 * @exports {Object} - Tag model
 * @exports {Object} - User model
 */
import thinky from '../thinky';

import Article from './article';
import Collection from './collection';
import Group from './group';
import Page from './page';
import Setting from './setting';
import Tag from './tag';
import User from './user';
const type = thinky.type;
const r = thinky.r;

const promises = [];

for (let name in thinky.models) {// eslint-disable-line
  if (thinky.models[name] && thinky.models[name].ready !== undefined) {
    promises.push(thinky.models[name].ready());
  }
}
Promise.all(promises).then(() => {
  for (let name in thinky.models) {// eslint-disable-line
    if (thinky.models[name] && thinky.models[name].relationship !== undefined) {
      thinky.models[name].relationship();
    }
  }
});
export { Article, Collection, Group, Page, Setting, Tag, User };
