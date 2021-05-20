import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Status from "components/Appointment/status";
import Form from "components/Appointment/form";
import Confirm from "components/Appointment/confirm";
import Error from "components/Appointment/error";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const DELETING = "DELETING";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE= "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    
    if (interview.student === "") {
      setError("Please type student name above.")
      return;
    }
    
    if (interview.interviewer === null) {
      setError("Please select an interviewer from the list")
      return;
    }

    setError("");
    
    setMessage("Saving");
    transition(SAVING);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteApp() {
    setMessage("Deleting")
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => {
      transition(EMPTY)
    })
    .catch(() => {
      transition(ERROR_DELETE, true)
    })
  }
  
  return (
  <article className="appointment">
    <Header time={props.time}/>
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
    )}
    {mode === CREATE && (
      <Form 
        name={props.name}
        interviewers={props.interviewers}
        value={props.value}
        onSave={save}
        error={error}
        onCancel={() => back()}
      />
    )}
    {mode === EDIT && (
      <Form 
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        value={props.value}
        onSave={save}
        error={error}
        onCancel={() => back()}
      />
    )}
    {mode === SAVING && (
      <Status
        message={message}
      />
    )}
    {mode === DELETING && (
      <Status
        message={message}
      />
    )}
    {mode === ERROR_SAVE && (
      <Error
        message="Could not save appointment."
        onClose={back}
      />
    )}
    {mode === ERROR_DELETE && (
      <Error
        message="Could not delete appointment."
        onClose={back}
      />
    )}
    {mode === CONFIRM && (
      <Confirm  
      onCancel={back}
      onConfirm={deleteApp}
      />
    )}
  </article>
  )
}