// react essentials
import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
//API
import API from "../utils/API"

// calendar and time picker
import Calendar from 'rc-calendar'
import moment from 'moment'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import enUS from 'rc-calendar/lib/locale/en_US'
// css
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'

const now = moment()
const format = 'YYYY-MM-DD hh:mm a'
function getFormat(time) {
    return time ? format : 'YYYY-MM-DD'
}

const timePickerElement = <TimePickerPanel
    format={format}
    defaultValue={moment('12:00', 'HH:mm a')}
    showSecond={false}
    use12Hours
    minuteStep={30}
    hideDisabledOptions={true}
/>



// value retrieval
function onStandaloneSelect(value) {

    console.log('onStandaloneSelect');
    console.log(value && value.format(format))
    console.log(value)
}

function onStandaloneChange(value) {
    console.log('onStandaloneChange');
    console.log(value && value.format(format));
}

function UserScheduler(props) {
    // Setting our component's initial state
    const [books, setBooks] = useState([])
    let [formObject, setFormObject] = useState({ name: '', email: '', phone: '', time: '' })

    const selectDateTime = (value) => { setFormObject({ ...formObject, time: value.format(format) }) }

    // Load all appointments and store them with setBooks (first load)
    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all appointments and sets them to books
    async function loadBooks() {
        try {
            let result = await API.getBooks()
            setBooks(result.data)
        } catch (err) { console.log(err) }
    };

    // // Deletes an appointment from the database with a given id, then reloads appointment from the db
    // function deleteBook(id) {
    //     API.deleteBook(id)
    //         .then(res => loadBooks())
    //         .catch(err => console.log(err));
    // }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the appointment data
    // Then reload books from the database
    async function handleFormSubmit(event) {
        event.preventDefault()

        let hasBlank = false
        for (let key in formObject) {
            if (formObject[key] === "") {
                hasBlank = true
            }
        }
        if (!hasBlank) {
            try {
                await API.saveBook({
                    name: formObject.name,
                    email: formObject.email,
                    phone: formObject.phone,
                    time: formObject.time
                })
                setFormObject({
                    name: "",
                    email: "",
                    phone: "",
                    time: ''
                })
                await loadBooks()
            } catch (err) { console.log(err) }
        } else { console.log('else') }
        console.log('a')

    };

    // functions handling disabling dates and times
    let unavailable = books.map(item => moment(item.time, 'YYYY-MM-DDThh:mm:ss.SSSZ'))
    console.log(unavailable[0] ? unavailable[0].date() : '')
    let unavailDateTime = []
    unavailable.forEach(item => unavailDateTime.push({ year: item.year(), month: item.month(), date: item.date(), hour: item.hour(), minute: item.minute() }))
    console.log('hi', unavailDateTime)

    function disabledTime(date) {
        let takenHours = []
        let takenMinutes = []

        // if (unavailable[0] && date.date())
        if (date && [0, 6].includes(date.day())) { //weekend hours
            takenHours = [...takenHours, ...[...Array(10).keys()], ...[...Array(4).keys()].map(item => 23 - item)]

        } else {
            takenHours = [...takenHours, ...[...Array(8).keys()], ...[...Array(2).keys()].map(item => 23 - item)]
        }


        return {
            disabledHours() {
                // for (let i = 0; i < unavailDateTime.length; i++) {
                //     if (date.year() === unavailDateTime[i].year && date.month() === unavailDateTime[i].month && date.date() === unavailDateTime[i].date && h === unavailDateTime[i].hour) {
                //         takenHours.push(unavailDateTime[i].minute) 
                //     }
                // }
                return takenHours
            },
            disabledMinutes(h) {

                for (let i = 0; i < unavailDateTime.length; i++) {
                    if (date.year() === unavailDateTime[i].year && date.month() === unavailDateTime[i].month && date.date() === unavailDateTime[i].date && h === unavailDateTime[i].hour) {
                        takenMinutes.push(unavailDateTime[i].minute)
                    }
                }
                return takenMinutes
            }
        }
    }


    function disabledDate(current) {
        if (!current) {
            // allow empty select
            return false;
        }
        const date = moment();
        date.hour(0);
        date.minute(0);
        date.second(0);
        return current.valueOf() < date.valueOf()  // can not select days before today
    }

    return (
        <>
            <Row id='mainForm'>
                <Col md='auto'>
                    <Calendar className="mx-auto" id='userCalendar'
                        showWeekNumber={false}
                        locale={enUS}
                        defaultValue={now}
                        disabledTime={disabledTime}
                        showToday
                        format={getFormat(true)}
                        showOk={false}
                        timePicker={timePickerElement}
                        onChange={onStandaloneChange}
                        disabledDate={disabledDate}
                        onSelect={selectDateTime} //onStandaloneSelect
                        renderFooter={(mode) => (<span>{mode} extra footer</span>)}
                    />
                </Col>
                <Col>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="" name='name' value={formObject.name} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="" name='email' value={formObject.email} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formPhone">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" placeholder="" name='phone' value={formObject.phone} onChange={handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" placeholder="Select date and time from calendar" name='time' value={formObject.time} readOnly />
                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={handleFormSubmit}>
                            Submit
                    </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default UserScheduler