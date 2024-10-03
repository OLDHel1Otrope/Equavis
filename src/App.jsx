import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';       // Login page
import Workspace from './components/Workspace'; // Workspace page
import NotFound from './components/NotFound.jsx';   // 404 page for unknown routes
import Header from './components/Header';  // Optional: A common header
import GraphDisplay from './components/GraphDisplay.jsx';
import Todo from './components/Todo.jsx';

const App = () => {
  return (
    <Router>
      <Header />
      {/* but how do I change the contents in the header depending on what page we are on */}
      <Routes>
        <Route path="/" element={<GraphDisplay />} />             {/* Default to Login */}
        <Route path="/login" element={<Login />} />        {/* Login route */}
        <Route path="/workspace" element={<Workspace />} /> {/* Workspace route */}
        <Route path="todo" element={<Todo/>}/>
        <Route path="*" element={<NotFound />} />          {/* Catch-all for 404 */}
      </Routes>
    </Router>
  );
};

export default App;
