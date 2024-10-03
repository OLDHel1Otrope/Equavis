import React, { useState, useEffect } from 'react';
import MathConverter from './MathConverter';

const FunctionInput = ({onSubmit}) => {
  const [mathFunction, setMathFunction] = useState('');
  const [functionsList, setFunctionsList] = useState([]);
  const [isLarge, setIsLarge] = useState(false);

  const toggleSize = () => {
    setIsLarge(!isLarge);
  };

  const handleInputChange = (event) => {
    setMathFunction(event.target.value);
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const csvData = reader.result;
        // Parse the CSV data here and update state
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mathFunction.trim() !== '') {
      setFunctionsList([...functionsList, mathFunction]); // Append new function to the list
      setMathFunction(''); // Clear input after submission
      if(mathFunction){
        onSubmit(mathFunction);
      }
      console.log(functionsList);
    }
  };

  const clearAllFunctions=(event)=>{
    event.preventDefault();
    setFunctionsList([]);
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const parentDiv = document.getElementById('function-container');
      if (parentDiv) {
        parentDiv.style.height = `${parentDiv.offsetWidth}px`; // Make it responsive
      }
    });

    const parentDiv = document.getElementById('function-container');
    if (parentDiv) {
      resizeObserver.observe(parentDiv);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div  className={`toggle-div ${isLarge ? 'large' : 'small'}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={mathFunction}
          onChange={handleInputChange}
          placeholder="Enter a mathematical function (e.g. y=x*x+2*x+1)"
          style={{ width: '100%', padding: '10px', fontSize: '1rem', boxSizing: 'border-box' }}
        />
        
        <button type="submit" style={{ marginTop: '5px',marginRight:'5px' }}>Add</button>
        <button onClick={clearAllFunctions} style={{ marginTop: '5px',marginRight:'5px' }}>Clear All</button>
        <button onClick={toggleSize} style={{ marginTop: '5px',marginRight:'5px' }}>Toggle Size</button>
        <button style={{ marginTop: '5px',marginRight:'5px' }}>Upload csv</button>
        <button style={{ marginTop: '5px',marginRight:'5px' }}>Data from web</button>
      </form>
      <div className="function-list" style={{ marginTop: '20px' }}>
        {functionsList.map((func, index) => (
          <div key={index} style={{ marginTop: '5px' }}>
            <MathConverter equation={func} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunctionInput;
