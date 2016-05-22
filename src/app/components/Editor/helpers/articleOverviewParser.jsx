
import _ from 'lodash';
import { atomicBlockTypes } from '../atomicBlocks/atomicBlockTypes';

export function parseArticleOverview(rawDraft) {
  const overview = _.cloneDeep(rawDraft);
  const moreInfoEntityKey = findMoreInfoType(overview.entityMap);

  if (moreInfoEntityKey) {
    const firstIndexAfterMoreInfoBlock = overview.blocks.findIndex(containsAtomicEntityKey(moreInfoEntityKey)) + 1;

    overview.blocks.splice(firstIndexAfterMoreInfoBlock, overview.blocks.length - firstIndexAfterMoreInfoBlock);
  }

  return overview;

  function findMoreInfoType(entityMap) {
    let moreInfoTypeKey;
    Object.keys(entityMap).forEach(entityKey => {
      if (entityMap[entityKey].type === atomicBlockTypes.MORE_INFO) {
        moreInfoTypeKey = entityKey;
      }
    });
    return moreInfoTypeKey;
  }

  function entityRangeContainsEntityKey(entityKey) {
    return function entityRangeHasEntityKey(entityRange) {
      if (Number(entityRange.key) === Number(entityKey)) {
        return true;
      }
    };
  }

  function containsAtomicEntityKey(entityKey) {
    return function blockHasAtomicEntityKey(block) {
      if (block.type === 'atomic' && block.entityRanges.findIndex(entityRangeContainsEntityKey(entityKey)) !== -1) {
        return true;
      } else {
        return false;
      }
    };
  }
}
