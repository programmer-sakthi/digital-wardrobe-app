import React, { useState } from "react";
import "./MainNavigation.css";

function MainNavigation() {
  const defaultSection = {
    id: 123,
    name: "Default",
    dresses: ["this is a sample"],
  };
  const [sections, setSections] = useState([defaultSection]);
  const [sectionName, setSectionname] = useState("");
  const [dressName, setDressName] = useState("");
  const [currentSection, setCurrentSection] = useState(123);

  const filtered = sections.find((element) => element.id === currentSection);

  return (
    <div>
      <nav>
        <ul>
          <input
            type="text"
            onChange={(e) => {
              setSectionname(e.target.value);
            }}
          />
          <button
            onClick={(e) => {
              setSections([
                ...sections,
                { name: sectionName, id: Date.now(), dresses: [] },
              ]);
              setSectionname("");
            }}
          >
            Add Section
          </button>
          <h3>Sections :</h3>
          {sections.map((element) => (
            <li key={element.id} className={element.id === currentSection ? 'current-section-item' : 'section-item'} >
              <span
                onClick={(e) => {
                  setCurrentSection(element.id);
                  // e.target.style.color = "green";
                }}
              >
                {element.name}
              </span>
              <button
                onClick={(e) => {
                  if (sections.length === 1) {
                    alert("You should atleast have one section");
                  } else if (element.id === currentSection) {
                    alert("You cannot delete the Current Section");
                  } else {
                    setSections(
                      sections.filter((section) => section.id !== element.id)
                    );
                  }
                }}
              >
                delete
              </button>
            </li>
          ))}
          <h3>Dresses :</h3>
          <ul>
            {filtered.dresses.map((ele, index) => (
              <li key={index}>{ele}</li>
            ))}
          </ul>
          <br />
          <input
            type="text"
            onChange={(e) => {
              setDressName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              setSections(
                sections.map((section) =>
                  section.id === currentSection
                    ? { ...section, dresses: [...section.dresses, dressName] }
                    : section
                )
              );
            }}
          >
            Add Dress
          </button>
          <h2>
            Current Section :{" "}
            {sections.find((element) => element.id === currentSection).name}
          </h2>
        </ul>
      </nav>
    </div>
  );
}

export default MainNavigation;
