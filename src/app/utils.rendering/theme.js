import { fade } from 'material-ui/utils/colorManipulator';
import { cyan700, grey600, pinkA100, pinkA400, fullWhite } from 'material-ui/styles/colors';
import zIndex from 'material-ui/styles/zIndex';

const pinkish = '#DD144D';

export default {
  zIndex,
  spacing: {
    iconButtonSize: 24,
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: cyan700,
    primary2Color: cyan700,
    primary3Color: grey600,
    accent1Color: pinkish,
    accent2Color: pinkA400,
    accent3Color: pinkA100,
    textColor: fullWhite,
    alternateTextColor: '#40404E',
    canvasColor: '#303030',
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12)
  }
};
