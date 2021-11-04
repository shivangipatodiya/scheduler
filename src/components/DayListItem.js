import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss";

import { formatSpot } from "helpers/utils";


export default function DayListItem(props) {
  const availableSpots = formatSpot(props.spots)
  const dayClass = classNames("day-list__item", {
    "day-list__item--full": !props.spots,
    "day-list__item--selected": props.selected
  });
  
  return (
    <li className={dayClass} data-testid="day" onClick={props.setDay} selected={props.selected}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{availableSpots}</h3>
    </li>
  );
}