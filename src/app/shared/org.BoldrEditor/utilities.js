
export function getBlockStyle(block) {
  switch (block.getType()) {
    case 'header-two': return 'h2';
    case 'header-three':return 'h2';
    case 'header-four':return 'h2';
    case 'blockquote': return 'h2';
    case 'code-block': return 'h2';
    case 'ordered-list-item': return 'h2';
    case 'unordered-list-item': return 'h2';
    default: return 'h2';
  }
}
