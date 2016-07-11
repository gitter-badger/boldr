import React from 'react';
import { Entity } from 'draft-js';

export default function getBoxPos() {
  const scrollY = window.scrollY ? window.scrollY : window.pageYOffset;
  const boxPosTop = window.getSelection().getRangeAt(0).getBoundingClientRect().top;
  if (boxPosTop < 1) {
    try {
      return window.getSelection().getRangeAt(0).endContainer.getBoundingClientRect().top + scrollY;
    } catch (err) {
      return;
    }
  }
  return boxPosTop + scrollY;
}
