import util from 'util';
import _ from 'lodash';
import mailer from './mailer';
import { handleRender } from './renderReact';
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

function extractIds(arr) {
  return _.map(arr, _.property('id'));
}

export { handleRender, mailer, clone, normalize, extractIds };
