import React, { useState, useEffect,useRef } from 'react';
import MathConverter from './MathConverter';
import {useFunctionContext} from './contexts/FunctionalContext.jsx';
import { convertMathExpression } from './Coorinates';
import { evaluateExpression } from './FormPoints';
import CsvInput from './CsvInput.jsx';


const FunctionInput = () => {
  const [isVisible, setIsVisible] = useState(false);

  const { functionList, setFunctionsList, coordinateList, setCoordinateList } = useFunctionContext();
  const fileInputRef = useRef(null);

    const addFunction = (equation) => {
        setFunctionsList([...functionList,equation]);
    };

    const addCoordinate = (equation) => {
      const expression = convertMathExpression(equation);
      console.log(expression)
      const newCoordinates = evaluateExpression(expression, -100, 100,0.1);
      setCoordinateList([...coordinateList, newCoordinates]);
    };

    const handleCSVUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const csvData = reader.result;
          const rows = csvData.split('\n').map((row) => row.split(','));
    
          // Filter out any empty rows and add each as a new list to the state
          const nonEmptyRows = rows.filter(row => row.length > 1);
    
          // Update state by adding new rows to the existing state
          setCoordinateList((coordinateList) => [...coordinateList, ...nonEmptyRows]);
        };
        reader.readAsText(file);
      }
    };

  const [mathFunction, setMathFunction] = useState('');
  const [isLarge, setIsLarge] = useState(false);

  const toggleSize = () => {
    setIsLarge(!isLarge);
  };

  const handleInputChange = (event) => {
    setMathFunction(event.target.value);
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mathFunction.trim() !== '') {
      addCoordinate(mathFunction);
      addFunction(mathFunction);
      setMathFunction('');
      console.log(functionList);
    }
  };

  const clearAllFunctions=(event)=>{
    event.preventDefault();
    setFunctionsList([]);
  }

  const toggleDiv = () => {
    setIsVisible(!isVisible);
  };


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
        <button style={{ marginTop: '5px',marginRight:'5px' }} onClick={toggleDiv}>Upload csv</button>
        {isVisible && (
        // <div className="centered-div">
        //   This is a centered div.
        // </div>
        <CsvInput></CsvInput>
      )}
        
        <button style={{ marginTop: '5px',marginRight:'5px' }}>Data from web</button>
      </form>
      <div className="function-list" style={{ marginTop: '20px' }}>
        {functionList.map((func, index) => (
          <div key={index} style={{ marginTop: '5px' }}>
            <MathConverter equation={func} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunctionInput;
