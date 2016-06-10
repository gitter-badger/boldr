import React from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
const Tag = props => {
  return (
    <FlatButton label={ props.tagname } />
  );
};
export default Tag;

Tag.propTypes = {
  tagname: React.PropTypes.string.isRequired
};
