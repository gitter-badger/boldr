export const API_BASE = '/api/v1';
export function capitalize(string) {
  return (string.substring(0, 1).toUpperCase() + string.substring(1));
}

export function trimPost(params) {
  return {
    ...convertKeyNameInSnakeCase(params),
    items_attributes:
      params.itemsAttributes
        .filter(item => !item.editing)
        .map(item => convertKeyNameInSnakeCase(item))
  };
}

function convertKeyNameInSnakeCase(object) {
  return Object.keys(object).reduce((newObject, oldKey) => {
    newObject[convertCamelCaseToSnakeCase(oldKey)] = object[oldKey];
    return newObject;
  }, {});
}

function convertCamelCaseToSnakeCase(string) {
  return string.replace(/([A-Z])/g,
    (string) => {
      return '_' + string.charAt(0).toLowerCase(); // eslint-disable-line
    }
  );
}
