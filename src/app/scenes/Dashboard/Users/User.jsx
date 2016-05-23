import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const User = (props) => {
  return (
    <TableRow>
      <TableRowColumn>{ props.user.userId }</TableRowColumn>
      <TableRowColumn>{ props.user.username }</TableRowColumn>
      <TableRowColumn>{ props.user.email }</TableRowColumn>
      <TableRowColumn>{ props.user.firstName }</TableRowColumn>
      <TableRowColumn>{ props.user.lastName }</TableRowColumn>
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
