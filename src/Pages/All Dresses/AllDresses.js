import React, { useState } from "react";
import ListDresses from "../../Components/ListDresses";
import Navigation from "./Navigation";
import { Card } from "../../Components/Card";

const sections = [
  {
    id: 0,
    name: "All"
  },
  {
    id: 1,
    name: "Tops",
  },
  {
    id: 2,
    name: "Botoms",
  },
  {
    id: 3,
    name: "Shoes",
  },
  {
    id: 4,
    name: "Accessories",
  },
  {
    id: 5,
    name: "Others",
  },
];




function AllDresses() {

  function onClick(id)
  { 
    setCurrentSection(id);
  }

  const [currentSection,setCurrentSection] = useState(0);
  return (
    <div>
      <Navigation onClick={onClick} currentSection={currentSection}/>
      <ListDresses id={currentSection} />
    </div>
  );
}

export default AllDresses;
