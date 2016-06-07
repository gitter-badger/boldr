import * as constants from './boldr.actions';

const INITIAL_STATE = {
  isLoading: true,
  isSideBarOpen: false,
  selectedDrawerMenuListItem: 1,
  error: false,
  title: 'Boldr',
  url: '',
  analyticsId: '',
  sitename: '',
  logo: ''
};

export default function boldr(state = INITIAL_STATE, action) {
  switch (action.type) {
    case constants.DONE_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case constants.TOGGLE_SIDE_BAR:
      return {
        ...state,
        isSideBarOpen: !state.isSideBarOpen
      };
    case constants.CHANGE_SELECTED_DRAWER_ITEM:
      return {
        ...state,
        selectedDrawerMenuListItem: action.index, title: action.title
      };

    default:
      return state;
  }
}
