/**
 * boldr/server/db/models/setting
 * Settings model for Thinky ORM
 * Provides persistent and configurable site options.
 * @exports {Object} - Setting model
 */

import thinky from '../thinky';
const type = thinky.type;
const r = thinky.r;

const Setting = thinky.createModel('Setting', {
  id: type.string().optional(),
  name: type.string(),
  description: type.string().optional()
});

export default Setting;
