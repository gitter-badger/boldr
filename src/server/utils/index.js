import util from 'util';
import mailer from './mailer';
import logger from './logger';
import _ from 'lodash';

/**
 * Clones an object
 * @param  {Mixed}    obj        The object to clone
 * @param  {Boolean} [deep=true] Optional. Deep cloning
 * @return {Mixed} The same object, but different reference
 */
function clone(obj, deep = true) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Copy constructor
  const result = obj.constructor();
  Object.keys(obj).forEach(key => {
    result[key] = deep ? clone(obj[key]) : obj[key];
  });

  return result;
}

function normalize(items) {
  return items.reduce((normalizedItems, item) => {
    normalizedItems[item.id] = item;
    return normalizedItems;
  }, {});
}

function group(items) {
  return items.reduce((normalizedItems, item) => {
    return {
      left: [
        ...normalizedItems['left'],// eslint-disable-line
        item['left']// eslint-disable-line
      ],
      right: [
        ...normalizedItems['right']// eslint-disable-line
          .filter(rightItem => rightItem.id !== item['right'].id), // eslint-disable-line
        item['right']// eslint-disable-line
      ]
    };
  }, {
    left: [],
    right: []
  });
}

function extractIds(arr) {
  return _.map(arr, _.property('id'));
}
const SOFT_DURABILITY = {
  durability: 'soft'
};

export { mailer, logger, clone, SOFT_DURABILITY, normalize, extractIds, group };
