import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const User = (props) => {
  return (
    <TableRow hoverable>
      <TableRowColumn>{ props.user.userId }</TableRowColumn>
      <TableRowColumn>{ props.user.email }</TableRowColumn>
      <TableRowColumn>{ props.user.firstname }</TableRowColumn>
      <TableRowColumn>{ props.user.lastname }</TableRowColumn>
      <TableRowColumn>{ props.user.createdAt }</TableRowColumn>
    </TableRow>
  );
};

User.propTypes = {
  user: PropTypes.object,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  createdAt: PropTypes.string
};

export default User;
