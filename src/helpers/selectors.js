export function getAppointmentsForDay(state, day) {

  const appFind = state.days.find(
    (days) => days.name === day);

  const appArray = appFind ? appFind.appointments.map(
    (id) => state.appointments[id]) : [];

  return appArray;

};

export function getInterview(state, interview) {

  if(!interview) {
    return null; 
  }

  const interviewerId = interview.interviewer
  const student = interview.student
  const interviewerData = {...state.interviewers}
  const interviewer = interviewerData[interviewerId]

  return {student, interviewer};
  
}