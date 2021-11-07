// function to calculate the number of spots available for a day 

export function formatSpot(number) {
  if (number === 0) {
    return "no spots remaining";
  } else if (number === 1) {
    return "1 spot remaining";
  }
  return number + " spots remaining";
}

