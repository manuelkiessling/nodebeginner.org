export const COMMAND_INITIALIZE = "COMMAND_INITIALIZE";
export const COMMAND_NOTE_CREATE = "COMMAND_NOTE_CREATE";
export const COMMAND_NOTE_UPDATE_TITLE = "COMMAND_NOTE_UPDATE_TITLE";
export const COMMAND_NOTE_UPDATE_CONTENT = "COMMAND_NOTE_UPDATE_CONTENT";
export const COMMAND_NOTE_SELECT = "COMMAND_NOTE_SELECT";

export const initializeCommand = () => ({ type: COMMAND_INITIALIZE });
export const createNoteCommand = (userId, noteTitle) => {
    if (userId == null) {
        throw new Error("this.props.userId is null!");
    }
    return { type: COMMAND_NOTE_CREATE, userId, noteTitle }
};
export const updateNoteTitleCommand = (userId, note, updatedTitle) => ({ type: COMMAND_NOTE_UPDATE_TITLE, userId, note, updatedTitle });
export const updateNoteContentCommand = (userId, note, updatedContent) => ({ type: COMMAND_NOTE_UPDATE_CONTENT, userId, note, updatedContent });
export const selectNoteCommand = (note) => ({ type: COMMAND_NOTE_SELECT, note });
