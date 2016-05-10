import { push } from 'react-router-redux';
import * as constants from './boldr.constants';

export const finishLoading = status => {
  return {
    type: constants.DONE_LOADING
  };
};

export const toggleSideBar = () => {
  return {
    type: constants.TOGGLE_SIDE_BAR
  };
};

export const changeSelectedDrawerMenuListItem = (index, title) => {
  return {
    type: constants.CHANGE_SELECTED_DRAWER_ITEM,
    index,
    title
  };
};
// export const loadApp = () => {
//   return (dispatch) => {
//     setTimeout(function() {
//       if (localStorage.getItem('isSignedIn') && localStorage.getItem('user')) {
//         dispatch(finishLoading());
//         // dispatch(authenticationActions.completeSignIn(JSON.parse(localStorage.getItem('user'))));
//         return;
//       }
//       return dispatch(finishLoading());
//     }, 100);
//   };
// };
export const routeToIndex = (index) => {
  return (dispatch) => {
    setTimeout(() => {
      let path = null;
      let title = null;
      switch (index) {
        case 1:
          path = '/home';
          title = 'Home';
          break;
        case 2:
          path = '/blog';
          title = 'Blog';
          break;
        case 3:
          path = '/dashboard';
          title = 'Dashboard';
          break;
        case 4:
          path = '/dashboard/articles';
          title = 'Dashboard';
          break;
        case 5:
          path = '/dashboard/articles';
          title = 'List all articles';
          break;
        case 6:
          path = '/dashboard/articles/create';
          title = 'Create new article';
          break;
        case 7:
          path = '/dashboard/settings';
          title = 'Settings';
          break;
        case 8:
          path = '/dashboard/pages';
          title = 'Pages';
          break;
        case 9:
          path = '/dashboard/users';
          title = 'Users';
          break;
        default:
          path = '/404';
      }

      if (path === null || path === '/404') {
        return dispatch(push(path));
      }

      dispatch(changeSelectedDrawerMenuListItem(index, title));
      dispatch(push(path));
      return;
    }, 500);
  };
};
