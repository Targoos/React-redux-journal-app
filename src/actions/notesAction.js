import swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload, loadNotes } from "../helpers";
import { types } from "../types/types";

export const startNewNote = () => async (dispatch, getState) => {
  const { uid } = getState().auth;

  const newNote = {
    title: "",
    body: "",
    date: new Date().getTime(),
  };

  const docRef = await db.collection(`${uid}/journal/notes`).add(newNote);

  dispatch(activeNote(docRef.id, newNote));
};

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const startLoadingNotes = (uid) => async (dispatch) => {
  const notes = await loadNotes(uid).then();

  dispatch(setNotes(notes));
};

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: {
    notes,
  },
});

export const startSaveNote = (note) => async (dispatch, getState) => {
  const { uid } = getState().auth;

  if (!note.url) delete note.url;

  const noteToFirestore = { ...note };
  delete noteToFirestore.id;

  await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

  dispatch(refreshNote(note.id, noteToFirestore));
  swal.fire("Saved", note.title, "success");
};

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note,
  },
});

export const startUploading = (file) => async (dispatch, getState) => {
  const { active: note } = getState().notes;

  const fileUrl = await fileUpload(file);

  console.log(fileUrl);
};
