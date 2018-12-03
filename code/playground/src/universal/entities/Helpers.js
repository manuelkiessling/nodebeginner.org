export const noteById = (notes, noteId) => {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === noteId) {
            return notes[i];
        }
    }
    return null;
};
