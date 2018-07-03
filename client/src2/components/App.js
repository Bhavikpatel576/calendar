import React, { Component } from 'react';
import '../App.css';
import Calendar from './index'
import EventForm from './form';

const style = {
  position: 'relative',
  margin: "50px auto"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: '',
      modalOn: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();

  if (response.status !== 200) throw Error(body.message);
    return body;
  };

  onDayClick = (e,day) => {
    alert(day);
    this.setState({
      modalOn: true
    })
  }

  toggleModal = () => {
    this.setState((prevState) => {
      modalOn: !prevState.modalOn
    })
  }

  render() {
    return (
      <div className="App">
          <Calendar style={style} 
            onDayClick={(e,d)=> this.onDayClick(e,d)}
          />
        {this.state.modalOn && 
          <EventForm 
            toggler={this.toggleModal}
          />}
      </div>
    );
  }
}

export default App;
