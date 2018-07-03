import React, { Component } from 'react';
import moment from 'moment';
import { TimePicker } from 'antd';
import firebase from '../firebase/firebase';

export default class EventForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: '',
      eventDetails: '',
      eventTime: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //toggler not working?
    // this.props.toggler();
    const itemsRef = firebase.database().ref('items');
    const item = {
      name: this.state.eventName,
      details: this.state.eventDetails,
    }
    itemsRef.push(item);
    this.setState({
      eventName: '',
      eventDetails: ''
    });
    this.props.toggler();
    alert('A name was submitted: ' + this.state.eventName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Event Name:
          <input
            name="eventName"
            type="text"
            value={this.state.eventName}
            onChange={this.handleChange}
          />
        </label>
        <label>
          Event Details:
          <input
            name="eventDetails"
            type="text"
            value={this.state.eventDetails}
            rows="4" cols="50"
            placeholder="Enter Event Information"
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
