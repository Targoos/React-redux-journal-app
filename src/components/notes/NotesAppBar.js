import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notesAction";

export const NotesAppBar = () => {
  const { active: note } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleSaveNote = () => {
    dispatch(startSaveNote(note));
  };

  // const handleInputClick = () =>
  //   document.querySelector("#fileSelector").click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) return dispatch(startUploading(file));
  };

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input
        type="file"
        name="file"
        id="fileSelector"
        // style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div>
        <button className="btn">Picture</button>

        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
