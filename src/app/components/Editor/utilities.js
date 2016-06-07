import React from 'react';
import { Entity } from 'draft-js';
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

export const Link = (props) => {
  const { url } = Entity.get(props.entityKey).getData();
  return (
    <a href={url} className={styles.link}>
      {props.children}
    </a>
    );
};
