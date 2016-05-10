import thinky from '../thinky';
const { type, r } = thinky;

const Tag = thinky.createModel('tags', {
  id: type.string().optional(),
  name: type.string(),
  description: type.string().optional()
});

export default Tag;
