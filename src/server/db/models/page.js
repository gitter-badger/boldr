/**
 * boldr/server/db/models/page
 * Page model for Thinky ORM
 *
 * @exports {Object} - Page model
 */

import shortid from 'shortid';
import thinky from '../thinky';
const type = thinky.type;
const r = thinky.r;
const Page = thinky.createModel('Page', {
  id: type.string().default(r.uuid()),
  title: type.string(),
  description: type.string().optional(),
  slug: type.string().min(2),
  content: type.string(),
  media: type.string()
});

Page.ensureIndex('slug');
Page.ensureIndex('title');

export default Page;
