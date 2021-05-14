import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {
  
  const dayClass = classnames(
    "day-list__item", {
    "day-list__item--selected": props.selected === true,
    "day-list__item--full": props.spots === 0
  })

  const formatSpots = (spots) => {
    let spotsAvailable;
    if (spots === 0) {
      spotsAvailable = "no spots remaining";
    }
    if (spots === 1) {
      spotsAvailable = "1 spot remaining";
    }
    if (spots === 2) {
      spotsAvailable = "2 spots remaining";
    }
    return spotsAvailable;
  }

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
} 