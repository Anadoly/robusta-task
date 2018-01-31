import React, { Component } from 'react';
import './App.css';
import Todos from './pages/Todos';
import {Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        <Route path="/" exact component={Todos} />
      </div>
    );
  }
}

export default App;
