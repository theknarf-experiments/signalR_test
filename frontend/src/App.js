import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as signalR from '@aspnet/signalr';

class App extends Component {
  async componentDidMount() {
    const client = new signalR.HubConnectionBuilder()
      .withUrl("/pingpong")
      .build();
    await client.start();

    const result = await client.invoke('Ping');
    console.log(result);

    await client.stop();
  }

  render() {
    return (
      <div className="App">
        <input />
        <div>
          
        </div>
      </div>
    );
  }
}

export default App;
