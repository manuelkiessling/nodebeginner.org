export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_NOTE_ADD = "COMMAND_NOTE_ADD";
export const COMMAND_NOTE_SHOW = "COMMAND_NOTE_SHOW";

export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
export const addNoteCommand = (noteTitle) => ({ type: COMMAND_NOTE_ADD, noteTitle: noteTitle });
export const showNoteCommand = (note) => ({ type: COMMAND_NOTE_SHOW, note: note });
