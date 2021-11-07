import React, { useState } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";

// form component to fill to book an appointment  

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [studentError, setStudentError] = useState("");
  const [interviewerError, setInterviewerError] = useState("");
  
  // function to validate the form for required information on saving
  function validate() {
    setStudentError("");
    setInterviewerError("");

    // error for blank student name
    if (student === "") {
      setStudentError("Student name cannot be blank");
      return;
    }

    //error if interviewer is not selected
    if (!interviewer) {
      setInterviewerError("Interviewer must be selected");
      return;
    }

    setStudentError("");
    setInterviewerError("");
    props.onSave(student, interviewer);
  }

  // reset function to remove the filled information on cancelling the form
  const reset = () => {
    setInterviewer(() => "");
    setStudent(() => "");
    setStudentError("");
    setInterviewerError("");
  };

  // function for cancelling form
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
