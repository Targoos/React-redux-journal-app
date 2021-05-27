import React from "react";
import moment from "moment";
import { activeNote } from "../../actions/notesAction";
import { useDispatch } from "react-redux";

export const JournalEntry = (props) => {
  const { id, date, title, body, url } = props;

  const noteDate = moment(date);
  const dayOfWeek = noteDate.format("dddd");
  const dayOfMonth = noteDate.format("Do");

  const dispatch = useDispatch();

  const handleEntryClick = () =>
    dispatch(activeNote(id, { date, title, body, url }));

  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      )}

      <div className="journal__entry-date-box">
        <span>{dayOfWeek}</span>
        <h4>{dayOfMonth}</h4>
      </div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
    </div>
  );
};
