import { CompositeDecorator, Entity } from 'draft-js';
import { Link } from './link';

const DECORATOR_TYPE = 'LINK';

export const linkDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

export function getCurrentUrl(editorState) {
  let url = '';

  const selection = editorState.getSelection();
  const anchorKey = selection.getAnchorKey();
  const anchorOffset = selection.getAnchorOffset();
  const entityId = editorState
    .getCurrentContent()
    .getBlockForKey(anchorKey)
    .getEntityAt(anchorOffset);

  if (entityId) {
    const currentEntity = Entity.get(entityId);
    if (currentEntity.getType() === DECORATOR_TYPE) {
      url = currentEntity.getData().url;
    }
  }
  return url;
}

export function createLinkEntity(url) {
  return Entity.create(DECORATOR_TYPE, 'MUTABLE', {
    url
  });
}


function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === DECORATOR_TYPE
      );
    },
    callback
  );
}
