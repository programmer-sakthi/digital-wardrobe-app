import React from "react";
import classes from "./ListDresses.module.css";

const dressList = [
  {
    id:0,
    dresses:["all"]
  },
  {
    id: 1,
    dresses: ["Otto", "Park Avenue"]
  },
  {
    id: 2,
    dresses: ["Levis"]
  },
  {
    id: 3,
    dresses: ["Puma"]
  },
  {
    id: 4,
    dresses: ["Rolex"]
  },
  {
    id: 5,
    dresses: ["3 monkeys hat"]
  },
];

function ListDresses(props) {
  const filtered = dressList.find((ele) => {
    return ele.id === props.id;
  });
  console.log(filtered)

  return (
    <div className={classes.container}>
      <ul style={{color:"white"}}>
        {filtered.dresses.map((ele) => {
          return <li>{ele}</li>;
        })}
      </ul>
    </div>
  );
}

export default ListDresses;
