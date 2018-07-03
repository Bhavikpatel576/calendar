
Mandatory
- [ ] UI should have one month hard coded view
- [ ] Ignore users/login, one hardcoded user
- [ ] Click on a day box and create a new event on the day which gets sent to the backend on clicking submit
    - [ ] Start time, end time, description
    - [ ] Submit form should disappear
    - [ ] Event should now appear in the days box
    - [ ] Events cannot span multiple days, start and end the same day
- [ ] Show all events the user has on their calendar
- [ ] 4 rows and 7 boxes 
- [ ] API backend using JSON. Don’t worry about UI look, just functionality. 

Optional
- [ ] Switch between months
- [ ] Week or day view
- [ ] Multiple day events
- [ ] Handled to many events to fit into UI box
- [ ] Update and delete events
- [ ] 5 rows of 7 boxes with correct date on the correct days



Back END

Events (min required)
- Post / Events
    - Should create an event
- Get /events
    - Should return all events

Events (Optional API) 

	- Delete /events/:id
	-


#API
  - postEvent(date, eventInformation)
  - getEventList(date)
  - updateEvent(eventid)
  - deleteEvent(eventid_

