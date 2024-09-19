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
    name: "Botooms",
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
  const [currentSection,setCurrentSection] = useState(0);
  return (
    <div>
      {/* <h1 style={{color:"white"}}>Current Section : {currentSection}</h1> */}
      <Navigation onClick={setCurrentSection} currentSection={currentSection}/>
      <ListDresses id={currentSection} />
    </div>
  );
}

export default AllDresses;
