import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function updateSpots(status) {
    
    const daySpots = state.day
    state.days.map((day) => {
      if (day.name === daySpots && status === "book") {
        day.spots = day.spots - 1;
      }
      else if (day.name === daySpots && status === "cancel") {
        day.spots = day.spots + 1;
      }
      return null;
    })
  }

  function bookInterview(id, interview) {
    
    if (!state.appointments[id].interview) {
      updateSpots("book");
    }
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    return axios.put(`/api/appointments/${id}`, {interview})
      .then(res => {
        setState({
          ...state,
          appointments
        })
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments
    };
    updateSpots("cancel");
    appointment[id].interview = null;
    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState({
        ...state,
        appointment
      })
    })
  }

  const setDay = day => setState({ ...state, day });
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'), 
      axios.get('/api/appointments'), 
      axios.get('/api/interviewers')])
      .then((all) => {
        setState(prev => ({...prev, 
          days: all[0].data, 
          appointments: all[1].data,
          interviewers: all[2].data
        }))
      })  
  }, [])

  return {state, setDay, bookInterview, cancelInterview}

};