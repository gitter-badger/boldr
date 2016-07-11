export const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'P', style: 'paragraph' },
  { label: 'BQ', icon: 'format_quote', style: 'blockquote' },
  { label: 'UL', icon: 'format_list_bulleted', style: 'unordered-list-item' },
  { label: 'OL', icon: 'format_list_numbered', style: 'ordered-list-item' }
];

export const INLINE_STYLES = [
  { label: 'B', icon: 'format_bold', style: 'BOLD' },
  { label: 'I', icon: 'format_italic', style: 'ITALIC' },
  { label: 'U', icon: 'format_underlined', style: 'UNDERLINE' },
  { label: 'Strike', icon: 'strikethrough_s', style: 'STRIKETHROUGH' },
  { label: 'Code', icon: 'code', style: 'CODE' }
];

export const COLORS = [
  { label: 'Red', style: 'red' },
  { label: 'Orange', style: 'orange' },
  { label: 'Yellow', style: 'yellow' },
  { label: 'Green', style: 'green' },
  { label: 'Blue', style: 'blue' },
  { label: 'Indigo', style: 'indigo' },
  { label: 'Highlight', style: 'highlight' }
];

export const BLOCK_CONTROLS = BLOCK_TYPES.map(type => type.label);
export const INLINE_CONTROLS = INLINE_STYLES.map(style => style.label);
export const COLOR_CONTROLS = COLORS.map(color => color.label);

export function validator(controls) {
  return (propValue, key, componentName, location, propFullName) => {
    const errors = propValue.map(value => (controls.indexOf(value) !== -1));
    if (! errors.every(error => !! error)) {
      return new Error(`Invalid prop ${propFullName} supplied to ${componentName}`);
    }
  };
}
