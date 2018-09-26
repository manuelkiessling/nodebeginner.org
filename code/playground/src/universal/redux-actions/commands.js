export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_NOTE_ADD = "COMMAND_NOTE_ADD";

export const addNoteCommand = (noteTitle) => ({ type: COMMAND_NOTE_ADD, noteTitle: noteTitle });
export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
