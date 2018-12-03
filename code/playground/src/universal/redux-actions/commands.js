export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_NOTE_CREATE = "COMMAND_NOTE_CREATE";
export const COMMAND_NOTE_UPDATE = "COMMAND_NOTE_UPDATE";
export const COMMAND_NOTE_SELECT = "COMMAND_NOTE_SELECT";

export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
export const createNoteCommand = (noteTitle) => ({ type: COMMAND_NOTE_CREATE, noteTitle: noteTitle });
export const updateNoteCommand = (noteId, noteTitle) => ({ type: COMMAND_NOTE_UPDATE, noteId: noteId, noteTitle: noteTitle });
export const selectNoteCommand = (note) => ({ type: COMMAND_NOTE_SELECT, note: note });
