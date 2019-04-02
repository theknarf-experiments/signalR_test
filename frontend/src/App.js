import React, { Component } from 'react';
import './App.css';
import * as signalR from '@aspnet/signalr';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: '', messages: []};

    this.handleChange = this.handleChange.bind(this);
    this.ping = this.ping.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  async componentDidMount() {
    const client = new signalR.HubConnectionBuilder()
      .withUrl("/pingpong")
      .build();
    await client.start();

    const clientChat = new signalR.HubConnectionBuilder()
      .withUrl("/chatHub")
      .build();
    await clientChat.start();

    const result = await client.invoke('Ping');
    console.log(result);

    clientChat.on('ReceiveMessage', result => {
      console.log('ReceiveMessage', result)
      this.setState({
          messages: [...this.state.messages, result]
      });
    });

    this.setState({ client, clientChat })
  }

  async componentWillUnmount() {
    console.log('state.client.stop()')
    await this.state.client.stop();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  submitMessage(event) {
    if(event.keyCode == 13) {
      this.state.clientChat.send('SendMessage', event.target.value);
      this.setState({ value: '' });
    }
  }

  async ping() {
    const result = await this.state.client.invoke('Ping');
    console.log('ping:', result);
  }

  render() {
    return (
      <div className="App">
        <input value={this.state.value} onChange={this.handleChange} onKeyUp={this.submitMessage} />
        <button onClick={this.ping}>Ping</button>
        <div>
        {
            (this.state.messages||[]).map( message =>
              <div> {message} </div>
            )
        }
        </div>
      </div>
    );
  }
}

export default App;
