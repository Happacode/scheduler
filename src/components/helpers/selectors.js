export function getAppointmentsForDay(state, day) {

  const appFind = state.days.find(
    (days) => days.name === day);

  const appArray = appFind ? appFind.appointments.map(
    (id) => state.appointments[id]) : [];

  return appArray;

};