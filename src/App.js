import React, { useState } from 'react';
import Section from './Section';
import './App.css';

function App() {
  const [sections, setSections] = useState([]);

  const addSection = () => {
    setSections([...sections, { id: Date.now(), elements: [] }]);
  };

  const addElementToSection = (sectionId, elementText) => {
    setSections(sections.map(section => 
      section.id === sectionId
        ? { ...section, elements: [...section.elements, elementText] }
        : section
    ));
  };

  return (
    <div className="App">
      <button onClick={addSection}>Add Section</button>
      {sections.map(section => (
        <Section 
          key={section.id}
          section={section}
          addElement={addElementToSection}
        />
      ))}
    </div>
  );
}

export default App;
