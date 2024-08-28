import React, { useState } from 'react';
import Element from './Element';

function Section({ section, addElement }) {
  const [elementText, setElementText] = useState('');

  const handleAddElement = () => {
    if (elementText.trim()) {
      addElement(section.id, elementText);
      setElementText('');
    }
  };

  return (
    <div className="section">
      <h2>Section {section.id}</h2>
      <input 
        type="text" 
        value={elementText}
        onChange={(e) => setElementText(e.target.value)}
        placeholder="Add new element"
      />
      <button onClick={handleAddElement}>Add Element</button>
      <ul>
        {section.elements.map((el, index) => (
          <Element key={index} text={el} />
        ))}
      </ul>
    </div>
  );
}

export default Section;
