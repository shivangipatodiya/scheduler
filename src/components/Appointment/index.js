import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((e) => {
        console.log(e);
        transition(ERROR_SAVE, true);
      });
  }
  function remove() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((e) => {
        console.log(e);
        transition(ERROR_DELETE, true);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      
      {/* mode for empty slot */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      
      {/* mode for showing the booked appointment slot */}
      {mode === SHOW && (
        <Show
          onDelete={() => transition(CONFIRM)}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={() => transition(EDIT)}
        />
      )}

      {/* mode for booking a new appointment */}
      {mode === CREATE && (
        <Form
          onCancel={() => back()}
          interviewers={props.interviewers}
          onSave={(student, interview) => save(student, interview)}
        />
      )}

      {/* mode for saving */}
      {mode === SAVING && <Status message={SAVING} />}

      {/* mode for deleting */}
      {mode === DELETING && <Status message={DELETING} />}

      {/* mode for confirmation to delete */}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={remove}
          onCancel={() => transition(SHOW)}
        />
      )}

      {/* mode to edit an appointment */}
      {mode === EDIT && (
        <Form
          onCancel={() => back()}
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onSave={(student, interview) => save(student, interview)}
        />
      )}

      {/* mode for error while saving an appointment */}
      {mode === ERROR_SAVE && (
        <Error message="Could not save appointment." onClose={() => back()} />
      )}

      {/* mode for error while deleting an appointment */}
      {mode === ERROR_DELETE && (
        <Error message="Could not delete appointment." onClose={() => back()} />
      )}
    </article>
  );
}
