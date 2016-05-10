import shortid from 'shortid';
import thinky from '../thinky';
const { type, r } = thinky;

const Page = thinky.createModel('pages', {
  id: type.string().optional().default(shortid.generate),
  title: type.string(),
  description: type.string().optional(),
  slug: type.string().min(2),
  content: type.string(),
  media: type.string()
});

export default Page;
