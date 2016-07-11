import { EditorState, convertToRaw, ContentState, convertFromRaw } from 'draft-js';
import { linkDecorator } from './linkDecorator';

export function createEditorStateFromRawDraft(rawDraft) {
  if (rawDraft) {
    const contentState = convertFromRaw(rawDraft);

    return EditorState.createWithContent(
      contentState,
      linkDecorator
    );
  }
  return EditorState.createEmpty(linkDecorator);
}

export function convertToRawDraftContentState(editorState) {
  const contentState = editorState.getCurrentContent();
  return convertToRaw(contentState);
}
