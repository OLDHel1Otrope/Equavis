import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

function CsvInput() {
  const [data, setData] = useState("");
  const [csvData, setCsvData] = useState([]); // State for storing parsed CSV data
  const [lineNumbers, setLineNumbers] = useState(""); // State for line numbers

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the file

    if (file) {
      // Use PapaParse to parse the CSV file
      Papa.parse(file, {
        complete: (result) => {
          console.log('CSV data parsed:', result.data); // Log the parsed data for debugging
          setCsvData(result.data); // Store the parsed data in state
          setData(JSON.stringify(csvData, null, 2))
        },
        header: true, // Set to true if the CSV has headers
        skipEmptyLines: true, // Skip empty lines
      });
    }
  };

  // Function to generate line numbers based on the current data
  function generateLineNumbers(text) {
    const lines = text.split('\n').length;
    return Array.from({ length: lines }, (_, i) => i + 1).join('\n'); // Line numbers as string
  }

  useEffect(() => {
    // Update line numbers whenever `data` changes
    setLineNumbers(generateLineNumbers(data)); // Store in state
  }, [data]);

  return (
    <div className="centered-div">
      <div style={{ height: '35px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 27px', borderBottom: '1px solid #ccc', width: '100%' }}>
        <div style={{color:'#dddddd'}}><i>csv handler</i></div>
        <div style={{display:'flex', justifyContent:'flex-end'}}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{
              display: 'inline-flex',
              height: '30px',
              color:'#dddddd',
              marginLeft: '10px',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              backgroundColor:'#222222',
            }}
          />
          <button style={{ display:'inline-flex', height: '30px', marginLeft:'10px', justifyContent: 'center', alignItems: 'center', textAlign:'center', backgroundColor:'#222222'}}><i>Add data to graph</i></button>
        </div>
      </div>
      <div className="editor-container" style={{ display: 'flex', width: '100%', height: '100%', overflow: 'auto' }}>
        <div
          className="line-numbers"
          style={{
            padding: '10px',
            paddingTop: '10px',
            height: '100%',
            textAlign: 'right',
            borderRight: '1px solid #ccc',
            userSelect: 'none',
            overflow:'hidden',
            color:'#dddddd',
            backgroundColor:'#222222',
            fontSize:'.65em',
            whiteSpace: 'pre-wrap', // Allows for proper line breaks in the line numbers
          }}
        >
          {lineNumbers}
        </div>
        <textarea
          id="editor"
          style={{
            flexGrow: 1,
            height: '100%',
            padding: '10px',
            border: 'none',
            resize: 'none',
            overflow: 'hidden',
            backgroundColor:'#222222',
            outline: 'none',
            color: '#dddddd' // Adjust color for better visibility
          }}
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter CSV data here"
        />
      </div>

    </div>
  );
}

export default CsvInput;
