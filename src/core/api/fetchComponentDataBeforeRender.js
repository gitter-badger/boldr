
export function fetchComponentDataBeforeRender(dispatch, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat(prev);
  }, []);
  const promises = needs.map(need => dispatch(need(params)));
  return Promise.all(promises);
}
