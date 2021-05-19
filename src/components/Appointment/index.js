import React, { useState } from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/header";
import Show from "components/Appointment/show";
import Empty from "components/Appointment/empty";
import Status from "components/Appointment/status";
import Form from "components/Appointment/form";
import Confirm from "components/Appointment/confirm";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const STATUS = "STATUS";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const [message, setMessage] = useState("");

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    setMessage("Saving");
    transition(STATUS);

    props.bookInterview(props.id, interview)
    .then(() => transition(SHOW));
  }

  function deleteApp() {
    setMessage("Deleting")
    transition(STATUS);
    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))
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
      />
    )}
    {mode === CREATE && (
      <Form 
        name={props.name}
        interviewers={props.interviewers}
        value={props.value}
        onSave={save}
        onCancel={() => back()}
      />
    )}
    {mode === STATUS && (
      <Status
        message={message}
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