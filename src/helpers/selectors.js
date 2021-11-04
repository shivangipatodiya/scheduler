export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.filter((eachDay) => eachDay.name === day);
  if (selectedDay[0]) {
    let appointmentsOfDay = selectedDay[0].appointments;
    let list = [];
    for (const appointment of appointmentsOfDay) {
      list.push(state.appointments[appointment]);
    }
    return list;
  }
  return [];
}

export function getInterview(state, interview) {
  if (interview) {
    return {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    };
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const selectedDay = state.days.filter((eachDay) => eachDay.name === day);
  if (selectedDay[0]) {
    let interviewersOfDay = selectedDay[0].interviewers;
    let list = [];
    for (const interviewer of interviewersOfDay) {
      list.push(state.interviewers[interviewer]);
    }
    return list;
  }
  return [];
}


