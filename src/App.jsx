// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Redux Provider
import store from './store/store'; // Redux store
import Login from './components/Login';
import Workspace from './components/Workspace';
import NotFound from './components/NotFound.jsx';
import Header from './components/Header';
import GraphDisplay from './components/GraphDisplay.jsx';
import Todo from './components/Todo.jsx';
import { MyProvider } from './components/contexts/FunctionalContext.jsx';

const App = () => {
  return (
    <Provider store={store}>
      <MyProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<GraphDisplay />} />
            <Route path="/login" element={<Login />} />
            <Route path="/workspace" element={<Workspace />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </MyProvider>
    </Provider>
  );
};

export default App;
