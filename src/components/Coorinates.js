// function replaceCharacterWithNumber(str, char, num) {
//     const regex = new RegExp(char, 'g');
//     return str.replace(regex, num);
//   }

  export const convertMathExpression=(expression) => {
    expression = expression.replace(/(\d+)\^(\d+)/g, (match, base, exponent) => {
      return `Math.pow(${base}, ${exponent})`;
    });

    // Replace mathematical functions with JavaScript equivalents
    expression = expression.replace(/sin/g, "Math.sin");
    expression = expression.replace(/cos/g, "Math.cos");
    expression = expression.replace(/tan/g, "Math.tan");
    expression = expression.replace(/log/g, "Math.log");

    return expression;
  }
  