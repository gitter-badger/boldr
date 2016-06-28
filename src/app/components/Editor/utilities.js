import React from 'react';
import { Entity, getVisibleSelectionRect } from 'draft-js';

import styles from './Editor.scss';
import { Media } from './atomicBlocks/media';
export const articleTypes = {
  OVERVIEW: 'overview',
  FULL: 'full',
  EDIT: 'edit'
};
// Custom overrides for "code" style.

const HANDLE_LINK = /http:\/\/(?:\[[^\]]+\]|\S+)/g;
export function handleLink(contentBlock, callback) {
  findWithRegex(HANDLE_LINK, contentBlock, callback);
}

export const HandleLinkSpan = (props) => {
  const href = props.children[0].props.text; // eslint-disable-line
  return <a href={ href }>{ props.children }</a>; // eslint-disable-line
};

export function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr;
  let start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}
export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'blockquote':
      return styles.blockquote;
    default:
      return null;
  }
}

export function getMediaBlockObject(block) {
  switch (block.getType()) {
    case 'atomic':
      return {
        component: Media,
        editable: false
      };
    default:
      return null;
  }
}

export const articleStyle = {
  fontWeight: 300,
  lineHeight: '2rem'
};
export function findLinkEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

export function getSelectedBlockElement(range) {
  let node = range.startContainer;
  do {
    const nodeIsDataBlock = node.getAttribute
                            ? node.getAttribute("data-block")
                            : null;
    if (nodeIsDataBlock) {
      return node;
    }
    node = node.parentNode;
  } while (node !== null);
  return null;
}
export function getSelectionCoords(editor, toolbar) {
  const editorBounds = editor.getBoundingClientRect();
  const rangeBounds = getVisibleSelectionRect(window);

  if (!rangeBounds) {
    return null;
  }

  const rangeWidth = rangeBounds.right - rangeBounds.left;

  const toolbarHeight = toolbar.offsetHeight;
  // const rangeHeight = rangeBounds.bottom - rangeBounds.top;
  const offsetLeft = (rangeBounds.left - editorBounds.left)
            + (rangeWidth / 2);
  const offsetTop = rangeBounds.top - editorBounds.top - (toolbarHeight + 14);
  return { offsetLeft, offsetTop };
}
