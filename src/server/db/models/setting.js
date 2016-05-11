/**
 * boldr/server/db/models/setting
 * Settings model for Thinky ORM
 * Provides persistent and configurable site options.
 * @exports {Object} - Setting model
 */

import thinky from '../thinky';
const { type, r } = thinky;

const Setting = thinky.createModel('settings', {
  id: type.string().optional(),
  name: type.string(),
  description: type.string().optional()
});

export default Setting;
