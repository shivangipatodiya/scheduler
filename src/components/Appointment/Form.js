import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [studentError, setStudentError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");
  function validate() {
    setStudentError("");
    setInterviewerError("");
    if (student === "") {
      setStudentError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setInterviewerError("Interviewer must be selected");
      return;
    }

    setStudentError("");
    setInterviewerError("");
    props.onSave(student, interviewer);
  }

  const reset = () => {
    setInterviewer(() => "");
    setStudent(() => "");
    setStudentError("");
    setInterviewerError("");
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            data-testid="student-name-input"
          />
          <section className="appointment__validation">{studentError}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
        <section className="appointment__validation">{interviewerError}</section>
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
