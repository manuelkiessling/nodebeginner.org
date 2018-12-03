export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_NOTE_CREATE = "COMMAND_NOTE_CREATE";
export const COMMAND_NOTE_UPDATE_TITLE = "COMMAND_NOTE_UPDATE_TITLE";
export const COMMAND_NOTE_UPDATE_CONTENT = "COMMAND_NOTE_UPDATE_CONTENT";
export const COMMAND_NOTE_SELECT = "COMMAND_NOTE_SELECT";

export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
export const createNoteCommand = (noteTitle) => ({ type: COMMAND_NOTE_CREATE, noteTitle: noteTitle });
export const updateNoteTitleCommand = (note, updatedTitle) => ({ type: COMMAND_NOTE_UPDATE_TITLE, note: note, updatedTitle: updatedTitle });
export const updateNoteContentCommand = (note, updatedContent) => ({ type: COMMAND_NOTE_UPDATE_CONTENT, note: note, updatedContent: updatedContent });
export const selectNoteCommand = (note) => ({ type: COMMAND_NOTE_SELECT, note: note });
