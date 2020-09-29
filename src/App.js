import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Join from './components/Join';
import Chat from './components/Chat';

const App = () => {
  const [name, setName] = useState('');

  return (
    <Router>
      <Route path="/" exact render={() => <Join setName={setName} />} />
      <Route path="/:room" render={() => <Chat name={name} />} />
    </Router>
  );
};

export default App;
