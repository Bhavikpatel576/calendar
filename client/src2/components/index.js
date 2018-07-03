import React, { Component } from 'react';
import moment from 'moment';
import './calendar.css';


export default class Calendar extends Component {
	constructor(props) {
		super(props);
		//pass in from parent component
		this.width  = props.width || "350px";
		this.style = props.style || {};
	}

	state = {
		dateContext: moment(),
		today: moment(),
		showMonthPopup: false,
		showYearPopup: false,
		viewForm: false
	}

	weekdays = moment.weekdays();
	weekdaysShort = moment.weekdaysShort();
	months = moment.monthsShort();

	year = () => {
		return this.state.dateContext.format("Y");
	}
	month = () => {
		return this.state.dateContext.format('MMMM');
	}
	daysInMonth = () => {
		return this.state.dateContext.daysInMonth();
	}
	currentDate = () => {
		return this.state.dateContext.get("date");
	}
	currentDay = () => {
		return this.state.dateContext.format("D");
	}
	firstDayOfMonth = () => {
		let dateContext = this.state.dateContext;
		let firstDay = moment(dateContext).startOf('month').format('d');
		return firstDay;
	}

	setMonth = (month) => {
		let monthNo = this.months.indexOf(month);
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set("month", monthNo);
		this.setState({
			dateContext: dateContext
		})
	}

	MonthNav = () => (
		<span className="label-month" onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
			{this.month()}
			{this.state.showMonthPopup && <this.selectList data={this.months} />}
		</span>
	)

	onSelectChange = (e, data) => {
		this.setMonth(data);
	}

	selectList = (props) => {
		let popup = props.data.map((data) => {
			return (
				<div key={data}>
					<a href="#test" onClick={(e) => {this.onSelectChange(e, data)}}>
						{data}
					</a>
				</div>
			);
		});

		return (
			<div className="month-popup">
				{popup}
			</div>
		);
	}

	onChangeMonth = (e, month) => {
		this.setState({
			showMonthPopup: !this.state.showMonthPopup
		});
	}

	YearNav = () => {
		return (
			this.state.showYearNav ?
			<input 
				defaultValue = {this.year()} 
				className="editor-year" 
				ref={(yearInput) => {this.yearInput = yearInput}}
				onKeyUp= {(e) => this.onKeyUpYear(e)}
 				onChange = {(e) => this.onYearChange(e)}
				type = "number"
				placeholder="year"
			/> :
			<span className="label-year" onDoubleClick={(e)=> {this.showYearEditor()}}>
				{this.year()}
			</span>
		);
	}

	showYearEditor = () => {
		this.setState({
			showYearNav: true
		})
	}

	setYear = (year) => {
		let dateContext = Object.assign({}, this.state.dateContext);
		dateContext = moment(dateContext).set("year", year);
		this.setState({
			dateContext: dateContext
		})
	}

	onYearChange = (e) => {
		this.setYear(e.target.value);
		this.props.onYearChange && this.props.onYearChange(e, e.target.value);
	}

	//this function doens't work
	onKeyUpYear = (e) => {
		if (e.which === 13 || e.which === 27) {
			this.setYear(e.target.value);
			this.setState({
				showYearNav: false
			})
		}
	}

	nextmonth = () => {
		let dateContext = Object.assign({}, this.state.dateContext)
		dateContext = moment(dateContext).add(1, 'month');
		this.setState({
			dateContext: dateContext
		})
		//guard clause that might not be needed
		this.props.onNextMonth && this.props.onNextMonth();
	}

	onDayClick = (e,d) => {
		this.props.onDayClick && this.props.onDayClick(e, d);
	}

	render() {
		let blanks = [];
		let weekdays = this.weekdaysShort.map((day) => {
			return <td key={day} className="week-day">{day}</td>
		});

		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanks.push(<td className="emptySlots">
				{""}
				</td>
			);
		}

		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++){
			daysInMonth.push(
				<td key ={d} className = {className}>
					<span onClick={(e)=> {this.onDayClick(e, d)}}>{d}</span>
					<tr>a.</tr>
					<tr>b.</tr>
					<tr>c.</tr>
				</td>
			);
		}

		var totalSlots = [...blanks, ...daysInMonth];
		let rows = [];
		let cells = [];

		totalSlots.forEach((row, i) => {
			if ((i % 7) !== 0 ) {
				cells.push(row);
			}else {
				let insertRow = cells.slice();
				rows.push(insertRow);
				cells = [];
				cells.push(row);
			}
			if (i === totalSlots.length - 1){
				let insertRow = cells.slice();
				rows.push(insertRow);
			}
		})
		let trElems = rows.map((d,i) => {
			return (
				<tr key={i*10}>
					{d}
				</tr>
			);
		})

		return (
			<div className="calendar-container">
					<table className="calendar">
						<thead>
							<tr className="calendar-header">
								<td colSpan="5">
									<this.MonthNav />
									{" "}
									<this.YearNav />
								</td>
								<td colSpan="2" className="nav-month">
									<i className="prev fa fa-fw fa-chevron-left"
										onClick={(e) => {this.prevMonth()}}>
									</i>
									<i className="prev fa fa-fw fa-chevron-right"
										onClick={(e)=> {this.nextMonth()}}>
									</i>
								</td>
								
							</tr>
						</thead>
						<tbody>
							<tr>
								{weekdays}
							</tr>
							{trElems}
						</tbody>
					</table>
			</div>
		);
	}
}



