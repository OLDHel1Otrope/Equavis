import React, { useEffect, useState } from 'react';
import Latex from 'react-latex';

const MathConverter = ({ equation }) => {
  const [mathString, setMathString] = useState('');

  useEffect(() => {
    // Convert the provided equation string to LaTeX format
    const convertToLatex = () => {
      if (equation) {
        try {
          setMathString(equation); // Directly use the equation as a LaTeX string
        } catch (error) {
          console.error("Error converting equation:", error);
          setMathString(''); // Clear on error
        }
      }
    };
    
    convertToLatex();
  }, [equation]);

  return (
    <div>
      <div style={{ padding: '20px',  margin: '0 auto' }}>
          <h3><Latex output="mathml">{`\\[ ${mathString} \\]`}</Latex></h3>
      </div>
    </div>
  );
};

export default MathConverter;
