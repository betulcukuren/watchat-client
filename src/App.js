import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import rug from 'random-username-generator';
import Join from './components/Join';
import Chat from './components/Chat';

const App = () => {
  const [name, setName] = useState(rug.generate());

  return (
    <Router>
      <Route path="/" exact render={() => <Join setName={setName} />} />
      <Route path="/:room" render={() => <Chat name={name} setName={setName} />} />
    </Router>
  );
};

export default App;
