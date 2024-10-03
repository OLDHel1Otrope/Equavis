// expressionEvaluator.js
export const evaluateExpression=(expression, start, end, step = 1)=>{
    const equation = expression.split('=')[1];
    const result = [];
    for (let x = start; x <= end; x += step) {
        const evaluatedExpression = equation.replace(/x/g, `(${x})`);
        const y = eval(evaluatedExpression);
        result.push({ x: x, y: y, z: 0 });
    }
    return result;
};
