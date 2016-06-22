import React, { Component, PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui/Table';

const User = (props) => {
  return (
    <TableRow hoverable>
      <TableRowColumn>{ props.user.id }</TableRowColumn>
      <TableRowColumn>{ props.user.email }</TableRowColumn>
      <TableRowColumn>{ props.user.profile.firstname }</TableRowColumn>
      <TableRowColumn>{ props.user.profile.lastname }</TableRowColumn>
      <TableRowColumn>{ props.user.createdAt }</TableRowColumn>
    </TableRow>
  );
};

User.propTypes = {
  user: PropTypes.object,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  createdAt: PropTypes.string
};

export default User;
