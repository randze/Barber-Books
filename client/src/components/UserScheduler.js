// react essentials
import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
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

// functions handling disabling dates and times
function disabledTime(date) {
    let takenTimes = []
    if (date && [0, 6].includes(date.day())) {

        return {
            disabledHours() {
                return [...[...Array(10).keys()], ...[...Array(4).keys()].map(item => 23 - item)] // unavailable hours after and before midnight
            },
        };
    }
    if (date && takenTimes.includes(date.valueOf())) {
        return
    }
    return {
        disabledHours() {
            return [...[...Array(8).keys()], ...[...Array(2).keys()].map(item => 23 - item)]
        },
    };
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
    let [formObject, setFormObject] = useState({ name: '', email: '', phone: '', appointment: '' })

    const selectDateTime = (value) => { setFormObject({ ...formObject, appointment: value.format(format) }) }




    // Load all books and store them with setBooks
    useEffect(() => {
        loadBooks()
    }, [])

    // Loads all books and sets them to books
    function loadBooks() {
        API.getBooks()
            .then(res =>
                setBooks(res.data)
            )
            .catch(err => console.log(err));
    };

    // Deletes a book from the database with a given id, then reloads books from the db
    function deleteBook(id) {
        API.deleteBook(id)
            .then(res => loadBooks())
            .catch(err => console.log(err));
    }

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API.saveBook method to save the book data
    // Then reload books from the database
    function handleFormSubmit(event) {
        event.preventDefault();
        if (formObject.title && formObject.author) {
            API.saveBook({
                title: formObject.title,
                author: formObject.author,
                synopsis: formObject.synopsis
            })
                .then(() => setFormObject({
                    title: "",
                    author: "",
                    synopsis: ""
                }))
                .then(() => loadBooks())
                .catch(err => console.log(err));
        }
    };

    return (
        <>
            <Row>
                <Col md='auto'>
                    <Calendar id='userCalendar'
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
                            <Form.Control type="text" placeholder="Select date and time from calendar" name='appointment' value={formObject.appointment} readOnly />
                        </Form.Group>


                        <Button variant="primary" type="submit" onClick={props.submitForm}>
                            Submit
                    </Button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default UserScheduler