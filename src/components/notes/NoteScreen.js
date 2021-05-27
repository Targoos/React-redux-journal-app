import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { activeNote } from "../../actions/notesAction";
import { useForm } from "../../hooks/userForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const { active: note } = useSelector((state) => state.notes);

  const [formNote, setFormNote, reset] = useForm(note);

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(activeNote(formNote.id, { ...formNote }));
  }, [formNote, dispatch]);

  const { title, body } = formNote;

  return (
    <div className="notes__main-content">
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          name="title"
          value={title}
          onChange={({ target }) => setFormNote("title", target.value)}
        />

        <textarea
          placeholder="What happened today"
          className="notes__textarea"
          name="body"
          value={body}
          onChange={({ target }) => setFormNote("body", target.value)}
        ></textarea>

        {note.url && (
          <div className="notes__image">
            <img
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
              alt="imagen"
            />
          </div>
        )}
      </div>
    </div>
  );
};
