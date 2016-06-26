import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import ArticleIcon from 'material-ui/svg-icons/action/description';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import FileManagerIcon from 'material-ui/svg-icons/file/folder-shared';
import PageBuildIcon from 'material-ui/svg-icons/action/build';
import UsersIcon from 'material-ui/svg-icons/social/people';
import CollectionsIcon from 'material-ui/svg-icons/image/collections';
const styles = {
  sidebar: {
    width: 256,
    minWidth: 256,
    height: '100%'
  },
  sidebarLink: {
    display: 'block',
    padding: '16px 0px',
    color: '#1b1b25',
    textDecoration: 'none'
  },
  divider: {
    margin: '8px 0',
    height: 1,
    backgroundColor: '#1b1b25'
  },
  content: {
    padding: '16px',
    height: '100%'
  }
};

const SidebarContent = (props) => {
  const links = [];

  for (let ind = 0; ind < 10; ind++) {
    links.push(
      <a key={ ind } href="#" style={ styles.sidebarLink }>Mock menu item { ind }</a>);
  }

  return (
      <div style={ styles.content }>
        <div style={ styles.divider } />
        <Link style={ styles.sidebarLink } to="/dashboard/articles">
          <ArticleIcon />
        </Link>
        <Link style={ styles.sidebarLink } to="/dashboard/settings">
          <SettingsIcon />
        </Link>
        <Link style={ styles.sidebarLink } to="/dashboard/users">
          <UsersIcon />
        </Link>
        <Link style={ styles.sidebarLink } to="/dashboard/uploader">
          <FileManagerIcon />
        </Link>
        <Link style={ styles.sidebarLink } to="/dashboard/pages">
          <PageBuildIcon />
        </Link>
        <Link style={ styles.sidebarLink } to="/dashboard/collections">
          <CollectionsIcon />
        </Link>
      </div>
  );
};

export default SidebarContent;

SidebarContent.propTypes = {
  style: PropTypes.object
};
