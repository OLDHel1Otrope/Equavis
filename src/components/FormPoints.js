export const evaluateExpression = (expression, start, end, step = 1) => {
    const equation = expression.split('=')[1];
    const result = [];
    
    // Create a new function using the parsed equation, with x as the variable
    const f = new Function('x', `return ${equation};`);
    
    for (let x = start; x <= end; x += step) {
        const y = f(x);
        result.push({ x: x, y: y, z: 0 });
    }
    return result;
};
