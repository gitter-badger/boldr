import React from 'react';
import { Entity } from 'draft-js';
import MoreInfo from './moreInfo';
import { atomicBlockTypes } from './atomicBlockTypes';

const styles = {
  media: {
    width: '100%'
  }
};

const Audio = (props) => {
  return <audio controls src={props.src} style={styles.media} />;
};

const Image = (props) => {
  return <img src={props.src} style={styles.media} />;
};

const Video = (props) => {
  return <video controls src={props.src} style={styles.media} />;
};

export const Media = (props) => {
  const entity = Entity.get(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === atomicBlockTypes.AUDIO) {
    media = <Audio src={src} />;
  } else if (type === atomicBlockTypes.IMAGE) {
    media = <Image src={src} />;
  } else if (type === atomicBlockTypes.VIDEO) {
    media = <Video src={src} />;
  } else if (type === atomicBlockTypes.MORE_INFO) {
    const { text } = entity.getData();
    media = <MoreInfo text={text}/>;
  }

  return media;
};
