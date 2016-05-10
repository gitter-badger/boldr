import shortid from 'shortid';
import thinky from '../thinky';
const { type, r } = thinky;

const Collection = thinky.createModel('collections', {
  id: type.string().optional().default(shortid.generate),
  name: type.string(),
  description: type.string().optional(),
  contentType: type.string(),
  content: type.string(),
  media: type.string()
});

export default Collection;
