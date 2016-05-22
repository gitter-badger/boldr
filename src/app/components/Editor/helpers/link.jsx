import React from 'react';
import { Entity } from 'draft-js';
import { styleMap } from '../utilities';

export const Link = (props) => {
  const {url} = Entity.get(props.entityKey).getData();

  return (
    <a href={url} style={styleMap.LINK} target="_blank">
            {props.children}
        </a>
    );
};
