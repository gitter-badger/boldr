import React from 'react';
import { Link } from 'react-router';
import LabelOutline from 'material-ui/svg-icons/action/label-outline';
import FlatButton from 'material-ui/FlatButton';

const inlineStyles ={
  tagIcon: {
    marginLeft: 0,
    width: 18,
    height: 18
  }
};

const Tag = props => {
  return (
    <FlatButton label={ props.tagname }>
      <LabelOutline color="#00AB6B" style={ inlineStyles.tagIcon } />
    </FlatButton>
  );
};
export default Tag;

Tag.propTypes = {
  tagname: React.PropTypes.string.isRequired
};
