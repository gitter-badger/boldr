import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Table, TableBody, TableHeader, TableRow, TableHeaderColumn } from 'material-ui/Table';
import User from './User';

class Users extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>

       <div className="container">

       <Table fixedHeader fixedFooter>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>User ID</TableHeaderColumn>
              <TableHeaderColumn>Username</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>First Name</TableHeaderColumn>
              <TableHeaderColumn>Last Name</TableHeaderColumn>
              <TableHeaderColumn>Created At</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
           { user.users.map((user, i) => <User key={ user.userId } user={ user } />) }
          </TableBody>
        </Table>
       </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.user,
  loading: state.user.loading
});

Users.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps, null)(Users);
