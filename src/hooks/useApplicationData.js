import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

// PUT request to book interview

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview: { ...interview } })
      .then((res) => {
        const updatedAppointments = { ...state.appointments };
        if (!updatedAppointments[id].interview) {
          const updatedDays = [...state.days];
          for (const day of updatedDays) {
            if (day.name === state.day) {
              day.spots--;
              setState({ ...state, days: updatedDays });
            }
          }
        }

        updatedAppointments[id].interview = { ...interview };

        setState({
          ...state,
          appointments: updatedAppointments
        });
      });
  }

// DELETE request to delete an interview

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(() => {
      const updatedAppointments = { ...state.appointments };
      updatedAppointments[id].interview = null;

      const updatedDays = [...state.days];
      for (const day of updatedDays) {
        if (day.name === state.day) {
          day.spots++;
        }
      }
      setState({
        ...state,
        appointments: updatedAppointments,
        days: updatedDays
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const testUrl = `/api`;
    Promise.all([
      axios.get(`${testUrl}/days`),
      axios.get(`${testUrl}/appointments`),
      axios.get(`${testUrl}/interviewers`)
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}
