import React from 'react';

const FunctionalContext = React.createContext();

export const MyProvider = ({ children }) => {
    const [functionList, setFunctionsList] = React.useState([]);
    const [coordinateList, setCoordinateList] = React.useState([]);

    return (
        <FunctionalContext.Provider value={{ functionList, setFunctionsList, coordinateList, setCoordinateList }}>
            {children}
        </FunctionalContext.Provider>
    );
};

export const useFunctionContext = () => React.useContext(FunctionalContext);
