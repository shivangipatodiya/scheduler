import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const output = props.days.map((day) => {
    return (
      <DayListItem
        name={day.name}
        key={day.id}
        spots={day.spots}
        setDay={() => props.onChange(day.name)}
        selected={day.name === props.value}
      />
    );
  });

  return <ul>{output}</ul>;
}
